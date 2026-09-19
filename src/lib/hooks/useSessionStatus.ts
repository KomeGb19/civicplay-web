import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useSessionStatus() {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  // Handle redirects based on session status
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
      return;
    }

    if (status === "authenticated") {
      if (session?.user.needsOnboarding) {
        router.replace("/play/onboarding");
        return;
      }
    }
  }, [status, session, router]);

  return {
    session,
    status,
    isLoading: status === "loading",
    isAuthenticated: status === "authenticated",
    isUnauthenticated: status === "unauthenticated",
    needsOnboarding: session?.user.needsOnboarding ?? false,
    update
  };
}