import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    NEXTAUTH_URL: process.env.NEXTAUTH_URL ? 'SET' : 'MISSING',
    AUTH_SECRET: process.env.AUTH_SECRET ? 'SET' : 'MISSING',
    MONGODB_URI: process.env.MONGODB_URI ? 'SET' : 'MISSING',
    AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID ? 'SET' : 'MISSING',
    AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET ? 'SET' : 'MISSING',
    NODE_ENV: process.env.NODE_ENV || 'NOT SET',
    // Also check if the auth module can be imported
    authImport: (() => {
      try {
        // @ts-ignore
        require('@/lib/auth')
        return 'OK'
      } catch (e) {
        if (e instanceof Error) {
          return `ERROR: ${e.message}`
        }
        return `ERROR: ${String(e)}`
      }
    })()
  })
}