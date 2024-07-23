// components/Tabs.tsx
"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import clsx from "clsx";

interface Tab {
  value: string;
  label: string;
  icon: string;
  component: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
}

export default function Tabs({ tabs }: TabsProps) {
  const [activeTab, setActiveTab] = useState<string>(tabs[0].value);

  return (
    <>
      <nav className="flex border-b border-main-6">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={clsx(
              "flex items-center px-4 py-2 text-sm font-medium",
              activeTab === tab.value
                ? "border-b-2 border-main-9 text-main-11"
                : "text-slate-11 hover:text-main-11"
            )}
          >
            <Icon icon={tab.icon} className="mr-2 h-5 w-5" />
            {tab.label}
          </button>
        ))}
      </nav>
      <div className="mt-6">
        {tabs.find((tab) => tab.value === activeTab)?.component}
      </div>
    </>
  );
}
