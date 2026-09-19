---
name: debug-auth-issue
description: Identified missing Google OAuth credentials causing authentication failure in live deployment
metadata:
  type: reference
---

During debugging of authentication issues in live deployment, the `/src/app/api/debug/env/route.ts` endpoint revealed that `AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET` were MISSING in the production environment, while other critical variables (NEXTAUTH_URL, AUTH_SECRET, MONGODB_URI) were SET. This explains the server error "There is a problem with the server configuration" when attempting to authenticate via Google OAuth. The NextAuth error handling was enhanced in `/src/app/api/auth/[...nextauth]/route.ts` to capture and log detailed error messages, confirming the missing credentials as the root cause.

**Why:** Authentication fails because NextAuth cannot initialize Google provider without client ID and secret.

**How to apply:** Configure AUTH_GOOGLE_ID and AUTH_GOOGLE_SECRET in the production environment variables (hosting platform settings), then re-deploy the application. After deployment, verify the variables are SET using the debug endpoint and test the authentication flow.

Related files: 
- `/src/app/api/debug/env/route.ts` (debug endpoint)
- `/src/app/api/auth/[...nextauth]/route.ts` (enhanced NextAuth error handling)
- `/src/lib/auth.ts` (NextAuth configuration)

---