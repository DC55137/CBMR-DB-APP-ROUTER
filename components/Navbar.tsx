"use client";

import React from "react";
import Link from "next/link";
import { Disclosure } from "@headlessui/react";
import { useRouter, usePathname } from "next/navigation";
import { navigation } from "@/data/constants";
import { Logo } from "@/components/Logo";
import { PATH_JOB } from "@/routes/path";

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

  return (
    <Disclosure as="nav" className="bg-main-2 shadow-md">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Logo className="fill-main-9" />
                </div>

                {/* Links section */}
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
                        aria-current={
                          isCurrentPath(item.href) ? "page" : undefined
                        }
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* New Job Button */}
              <div className="flex-shrink-0 hidden lg:inline-block">
                <button
                  onClick={() => router.push(`${PATH_JOB.root}/new-job`)}
                  className="rounded-md bg-main-9 px-4 py-2 text-sm font-medium text-white hover:bg-main-10 focus:outline-none focus:ring-2 focus:ring-main-11 focus:ring-offset-2 focus:ring-offset-main-2"
                >
                  New Job
                </button>
              </div>

              <div className="flex lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-slate-11 hover:bg-main-4 hover:text-main-11 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-main-11">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    isCurrentPath(item.href)
                      ? "bg-main-3 text-main-11"
                      : "text-slate-11 hover:bg-main-4 hover:text-main-11",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={isCurrentPath(item.href) ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              <Disclosure.Button
                as="a"
                href={`${PATH_JOB.root}/new-job`}
                className="block w-full rounded-md bg-main-9 px-3 py-2 text-center text-base font-medium text-white hover:bg-main-10"
              >
                New Job
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;

// ... (Bars3Icon and XMarkIcon remain the same)

const Bars3Icon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

const XMarkIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);
