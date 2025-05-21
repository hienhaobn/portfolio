import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ViewTransitions } from "next-view-transitions";
import { ThemeProvider } from "@/components/theme-provider";
import Nav from "@/components/nav";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Joy Dev",
};

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
