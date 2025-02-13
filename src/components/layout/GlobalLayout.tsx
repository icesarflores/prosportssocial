import React from "react";
import Navbar from "./Navbar";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

interface GlobalLayoutProps {
  children: React.ReactNode;
  breadcrumbs?: Array<{ label: string; href?: string }>;
}

const GlobalLayout = ({ children, breadcrumbs }: GlobalLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar className="py-1.5" />
      <main className="container mx-auto my-12 px-4 py-14">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} className="my-6" />}
        {children}
      </main>
    </div>
  );
};

export default GlobalLayout;
