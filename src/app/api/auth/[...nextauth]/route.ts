import type { NextRequest } from "next/server"
import { handlers } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    if (!handlers?.GET) {
      throw new Error("Handlers.GET is not defined")
    }
    return await handlers.GET(request)
  } catch (error) {
    console.error("NextAuth GET error:", error)
    return new Response(
      JSON.stringify({ error: "NextAuth Error", details: String(error) }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!handlers?.POST) {
      throw new Error("Handlers.POST is not defined")
    }
    return await handlers.POST(request)
  } catch (error) {
    console.error("NextAuth POST error:", error)
    return new Response(
      JSON.stringify({ error: "NextAuth Error", details: String(error) }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
}