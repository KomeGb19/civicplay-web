import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { getMongoClient } from "@/lib/mongodb";
import { connectDb } from "@/lib/db";
import { User } from "@/models/User";
import type { AvatarId } from "@/lib/constants";

declare module "next-auth" {
  interface User {
    role?: "user" | "guest";
    username?: string | null;
    avatarId?: AvatarId | null;
    guestId?: string | null;
  }

  interface Session {
    user: {
      id: string;
      email?: string | null;
      name?: string | null;
      image?: string | null;
      role: "user" | "guest";
      username?: string | null;
      avatarId?: AvatarId | null;
      guestId?: string | null;
      needsOnboarding: boolean;
    };
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id?: string;
    role?: "user" | "guest";
    username?: string | null;
    avatarId?: AvatarId | null;
    guestId?: string | null;
  }
}

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const providers = [
    ...(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET
      ? [
          Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
            allowDangerousEmailAccountLinking: true,
          }),
        ]
      : []),
    Credentials({
      id: "credentials",
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(raw) {
        const parsed = credentialsSchema.safeParse(raw);
        if (!parsed.success) return null;

        await connectDb();
        const user = await User.findOne({
          email: parsed.data.email.toLowerCase(),
        });
        if (!user?.passwordHash) return null;

        const ok = await bcrypt.compare(
          parsed.data.password,
          user.passwordHash,
        );
        if (!ok) return null;

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name ?? user.username ?? undefined,
          role: "user",
          username: user.username ?? null,
          avatarId: (user.avatarId as AvatarId | undefined) ?? null,
        };
      },
    }),
    Credentials({
      id: "guest",
      name: "Guest",
      credentials: {
        guestId: { label: "Guest ID", type: "text" },
      },
      async authorize(raw) {
        await connectDb();
        const guestId =
          typeof raw?.guestId === "string" && raw.guestId.length > 0
            ? raw.guestId
            : crypto.randomUUID();

        let user = await User.findOne({ guestId, role: "guest" });
        if (!user) {
          user = await User.create({
            role: "guest",
            guestId,
            name: "Guest",
            bestScores: { basic: 0, intermediary: 0, advance: 0 },
          });
        }

        return {
          id: user._id.toString(),
          name: user.username ?? "Guest",
          role: "guest",
          username: user.username ?? null,
          avatarId: (user.avatarId as AvatarId | undefined) ?? null,
          guestId: user.guestId,
        };
      },
    }),
];

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: process.env.MONGODB_URI
    ? MongoDBAdapter(getMongoClient())
    : undefined,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  providers,
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = user.role ?? "user";
        token.username = user.username ?? null;
        token.avatarId = user.avatarId ?? null;
        token.guestId = user.guestId ?? null;
      }

      if (trigger === "update" && session) {
        if (typeof session.username === "string") {
          token.username = session.username;
        }
        if (typeof session.avatarId === "string") {
          token.avatarId = session.avatarId as AvatarId;
        }
      }

      if (token.id && (!token.username || !token.avatarId)) {
        try {
          await connectDb();
          const dbUser = await User.findById(token.id).lean();
          if (dbUser) {
            token.username = dbUser.username ?? null;
            token.avatarId = (dbUser.avatarId as AvatarId | undefined) ?? null;
            token.role = (dbUser.role as "user" | "guest") ?? token.role;
            token.guestId = dbUser.guestId ?? null;
          }
        } catch {
          // DB may be unavailable during build; keep token as-is
        }
      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id ?? "";
      session.user.role = token.role ?? "user";
      session.user.username = token.username ?? null;
      session.user.avatarId = token.avatarId ?? null;
      session.user.guestId = token.guestId ?? null;
      session.user.needsOnboarding = !token.username || !token.avatarId;
      return session;
    },
  },
  events: {
    async createUser({ user }) {
      await connectDb();
      await User.findByIdAndUpdate(user.id, {
        $setOnInsert: {
          role: "user",
          bestScores: { basic: 0, intermediary: 0, advance: 0 },
        },
      });
    },
  },
});
