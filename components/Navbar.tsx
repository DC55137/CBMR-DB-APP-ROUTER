"use client";

import React from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { navigation } from "@/data/constants";
import { Logo } from "@/components/Logo";
import { PATH_JOB } from "@/routes/path";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isCurrentPath = (path: string) => {
    if (path === "/") {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  const MobileSidebar = () => (
    <Sheet>
      <SheetTrigger className="text-slate-11 transition lg:hidden hover:opacity-75">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-main-2">
        <div className="flex flex-col justify-between h-full pb-10 mt-10">
          <Link href="/" className="mx-auto mb-20">
            <span className="sr-only">Your App Name</span>
            <Logo className="h-8 my-auto fill-main-9" />
          </Link>
          <div className="flex flex-col space-y-4">
            {navigation.map((item) => (
              <Link
                href={item.href}
                key={item.href}
                className={cn(
                  "inline-flex mx-auto items-center px-1 pt-1 text-2xl font-medium",
                  isCurrentPath(item.href)
                    ? "text-main-11 border-main-9 border-b-2"
                    : "text-slate-11 hover:text-main-11"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <Button
            onClick={() => router.push(`${PATH_JOB.root}/new-job`)}
            className="mx-4 my-6 bg-main-9 text-white hover:bg-main-10"
          >
            New Job
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <nav className="bg-main-2 shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <Logo className="fill-main-9" />
              </Link>
            </div>

            {/* Desktop links section */}
            <div className="hidden lg:ml-10 lg:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      "rounded-md px-3 py-2 text-sm font-medium",
                      isCurrentPath(item.href)
                        ? "bg-main-3 text-main-11"
                        : "text-slate-11 hover:bg-main-4 hover:text-main-11"
                    )}
                    aria-current={isCurrentPath(item.href) ? "page" : undefined}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* New Job Button (desktop) */}
          <div className="flex-shrink-0 hidden lg:inline-block">
            <Button
              onClick={() => router.push(`${PATH_JOB.root}/new-job`)}
              className="bg-main-9 text-white hover:bg-main-10"
            >
              New Job
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <MobileSidebar />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
