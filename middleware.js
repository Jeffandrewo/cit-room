import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: ['/','/register', '/about-us'], 
    ignoredRoutes: ['/api']
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
