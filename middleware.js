import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: ['/', '/register'],
    ignoredRoutes: ['/api']
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
