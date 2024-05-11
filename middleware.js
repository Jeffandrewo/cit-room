import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: ['/','/register','/api/uploads', '/news', '/about-us', '/room-details', '/calendar', '/contact-us', '/eventlist', '/addingEvent'], 
    ignoredRoutes: ['/api']
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
