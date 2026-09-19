import { NextResponse } from 'next/server'
import { connectDb } from '@/lib/db'

export async function GET() {
  const envCheck = {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL ? 'SET' : 'MISSING',
    AUTH_SECRET: process.env.AUTH_SECRET ? 'SET' : 'MISSING',
    MONGODB_URI: process.env.MONGODB_URI ? 'SET' : 'MISSING',
    AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID ? 'SET' : 'MISSING',
    AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET ? 'SET' : 'MISSING',
    NODE_ENV: process.env.NODE_ENV || 'NOT SET',
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
  }

  let mongoDBConnection = 'NOT_TESTED'
  if (process.env.MONGODB_URI) {
    try {
      await connectDb()
      mongoDBConnection = 'SUCCESS'
    } catch (e) {
      if (e instanceof Error) {
        mongoDBConnection = `FAILED: ${e.message}`
      } else {
        mongoDBConnection = `FAILED: ${String(e)}`
      }
    }
  }

  return NextResponse.json({
    ...envCheck,
    mongoDBConnection
  })
}