import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ViewTransitions } from "next-view-transitions";
import { ThemeProvider } from "@/components/theme-provider";
import Nav from "@/components/nav";
import { generateSEOMetadata } from "@/lib/seo";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = generateSEOMetadata({
  title: "Joy Dev - Frontend Developer & Tech Enthusiast",
  description: "Personal portfolio and blog of Joy Dev, a passionate frontend developer sharing insights about web development, React, Next.js, and modern technologies.",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html suppressHydrationWarning lang="en" className="mdl-js">
        <body className={`${montserrat.variable}`}>
          <ThemeProvider attribute="class" disableTransitionOnChange>
            <Nav />
            <div className="text-foreground mx-auto w-[750px] max-w-full px-5 pt-20 pb-10">
              {children}
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
