import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { projects } from "./app/data";

// Create the i18n middleware
const intlMiddleware = createMiddleware(routing);

// Forward to the intl middleware
export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if this is a portfolio ID URL (old format) that should be redirected to a slug URL
  const portfolioIdRegex = /^\/(es|en)\/portfolio\/(\d+)$/;
  const match = pathname.match(portfolioIdRegex);

  if (match) {
    const [, locale, id] = match;
    const project = projects.find((project) => project.id === id);

    if (project && project.slug) {
      // Redirect to the new slug-based URL
      const newUrl = new URL(
        `/${locale}/portfolio/${project.slug}`,
        request.url
      );
      return NextResponse.redirect(newUrl);
    }
  }

  // For all other routes, use the intl middleware
  return intlMiddleware(request);
}

export const config = {
  // Match internationalized pathnames and portfolio routes
  matcher: ["/", "/(es|en)/:path*"],
};
