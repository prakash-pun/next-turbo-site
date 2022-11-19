import React from "react";
import Link from "next/link";
import {
  ChartBarIcon,
  Squares2X2Icon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

const solutions = [
  {
    name: "Team",
    href: "/team",
    icon: ChartBarIcon,
  },
  {
    name: "Projects",
    href: "/projects",
    icon: Squares2X2Icon,
  },
  {
    name: "Note",
    href: "/note",
    icon: DocumentTextIcon,
  },
];

const Sidebar = () => {
  return (
    <div className="hidden h-[calc(100vh-89px)] md:block md:space-x-8 md:pr-4">
      <div className="mt-6">
        <nav className="grid gap-y-8">
          {solutions.map((item) => (
            <Link href={item.href} key={item.name} legacyBehavior>
              <a
                key={item.name}
                href={item.href}
                className="-m-3 flex items-center rounded-md p-2"
              >
                <item.icon
                  className="h-6 w-6 flex-shrink-0 text-indigo-600"
                  aria-hidden="true"
                />
                <span className="ml-3 text-base font-medium text-gray-200 hover:text-gray-400">
                  {item.name}
                </span>
              </a>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export { Sidebar };
