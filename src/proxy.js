import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

// Next.js 16: use proxy.js instead of middleware.js
// Named export "proxy" is required
export const proxy = clerkMiddleware(async (auth, req) => {
  if (isAdminRoute(req)) {
    // Clerk will redirect unauthenticated users to sign-in.
    // After sign-in, NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/admin
    // sends them back to /admin automatically.
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
