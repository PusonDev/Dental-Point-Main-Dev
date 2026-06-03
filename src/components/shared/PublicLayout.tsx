import React from "react";

export default function PublicLayout({
  children,
  minimalHeader = false,
}: {
  children: React.ReactNode;
  minimalHeader?: boolean;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 
        Note: Header, Footer, and BanglaToggle are removed from here 
        because they are already globally provided in src/app/layout.tsx 
      */}
      {children}
    </div>
  );
}
