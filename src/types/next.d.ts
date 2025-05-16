/**
 * This file contains custom type declarations to handle conflicts
 * between Next.js and next-intl type systems
 */

// Override the AppRouteModule types from Next.js to fix the conflict
import "next";

declare module "next" {
  // Override the LayoutProps interface in the Next.js types
  interface LayoutProps {
    params: { locale: string; slug?: string };
    children: React.ReactNode;
  }
}

export {};
