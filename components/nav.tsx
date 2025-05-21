"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { ThemeSwitcher } from "./theme-switcher";

export default function Nav() {
  const path = usePathname();

  const links = [
    {
      path: "/",
      label: "Home",
    },
    {
      path: "/about",
      label: "About",
    },
    {
      path: "/projects",
      label: "Projects",
    },
    {
      path: "/blog",
      label: "Blog",
    },
  ];
  return (
    <div className="fixed top-5 left-0 z-50 w-full">
      <nav className="text-main-foreground border-border shadow-shadow rounded-base bg-main font-base w450:gap-4 mx-auto flex w-max gap-5 border-2 p-2.5 px-5 text-sm sm:text-base">
        {links.map((link) => (
          <Link
            key={link.path}
            className={clsx(
              "hover:border-border rounded-base border-2 px-2 py-1 transition-colors",
              path === link.path ? "border-border" : "border-transparent"
            )}
            href={link.path}
          >
            {link.label}
          </Link>
        ))}
        <ThemeSwitcher />
      </nav>
    </div>
  );
}
