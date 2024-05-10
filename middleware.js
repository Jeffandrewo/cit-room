import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: ['/','/register', '/about-us', '/room-details', '/news', '/calendar'], 
    ignoredRoutes: ['/api', '/api/uploads']
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
