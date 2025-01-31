import { NextResponse, type NextRequest } from "next/server";

export default async function authMiddleware(request: NextRequest) {
  const response = NextResponse.next();

  // const { data: session } = await betterFetch<Session>(
  //   "/api/auth/get-session",
  //   {
  //     baseURL: "http://localhost:3003",
  //     headers: {
  //       cookie: request.headers.get("cookie") || "",
  //     },
  //   }
  // );

  const sessionCookie = request.cookies.get("craftly.session_token");

  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * * - auth (authentication routes)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|auth|sign-in|sign-up|auth|verify-email).*)",
    // pathPattern,
    // ignore auth
  ],
};
