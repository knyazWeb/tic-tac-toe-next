import { auth } from "@/auth";
import { checkAccess } from "@/lib/actions";

export default auth(async (req) => {
  const isLoggedIn = !!req.auth;
  const authRoutes = ["/login", "/signup"];
  const isAuthRoute = authRoutes.includes(req.nextUrl.pathname);

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL("/", req.nextUrl));
    }
    return;
  }
  if (!isLoggedIn && !isAuthRoute) {
    return Response.redirect(new URL("/login", req.nextUrl));
  }

  const roomId = req.nextUrl.pathname.split("/")[2];
  if (roomId) {
    const hasAccess = await checkAccess(roomId, req.auth.user.id);
    if (!hasAccess) {
      return Response.redirect(new URL("/", req.nextUrl));
    }
  }

  return;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
