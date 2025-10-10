"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import * as Collapsible from "@radix-ui/react-collapsible";
import {
  Apple,
  Boxes,
  ChevronDown,
  ChevronLeft,
  Menu,
  Ruler,
  Utensils,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";

type RouteGroupType = {
  group: string;
  items: {
    href: string;
    label: string;
    icon: ReactNode;
  }[];
};

const ROUTE_GROUPS: RouteGroupType[] = [
  {
    group: "Foods Management",
    items: [
      {
        href: "/admin/foods-management/foods",
        label: "Foods",
        icon: <Apple className="mr-2 size-3" />,
      },
      {
        href: "/admin/foods-management/categories",
        label: "Categories",
        icon: <Boxes className="mr-2 size-3" />,
      },
      {
        href: "/admin/foods-management/serving-units",
        label: "Serving Units",
        icon: <Ruler className="mr-2 size-3" />,
      },
    ],
  },
  {
    group: "Meals Management",
    items: [
      {
        href: "/client",
        label: "Meals",
        icon: <Utensils className="mr-2 size-3" />,
      },
    ],
  },
];

// Route Group
type RouteGroupProps = RouteGroupType;
const RouteGroup = ({ group, items }: RouteGroupProps) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Collapsible.Root open={open} onOpenChange={setOpen}>
      <Collapsible.Trigger asChild>
        <Button
          className="text-foreground/80 flex w-full justify-between font-normal"
          variant="ghost"
        >
          {group}
          <div
            className={`transition-transform ${open ? "rotate-180" : "rotate-0"}`}
          >
            <ChevronDown />
          </div>
        </Button>
      </Collapsible.Trigger>
      <Collapsible.Content forceMount></Collapsible.Content>
    </Collapsible.Root>
  );
};

type DashboardLayoutProps = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex">
      <Collapsible.Root open={open} onOpenChange={setOpen}>
        <Collapsible.Trigger asChild>
          <Button size="icon" variant="outline">
            <Menu />
          </Button>
        </Collapsible.Trigger>
      </Collapsible.Root>

      <Collapsible.Root
        className="fixed top-0 left-0 z-20 h-dvh"
        open={open}
        onOpenChange={setOpen}
      >
        <Collapsible.Content forceMount>
          <div
            className={`bg-background fixed top-0 left-0 h-screen w-64 border p-4 transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}
          >
            <div className="flex items-center justify-center">
              <h1 className="font-semibold">Admin Dashboard</h1>
              <Collapsible.Trigger asChild>
                <Button
                  className="justify-self-end"
                  size="icon"
                  variant="outline"
                >
                  <ChevronLeft />
                </Button>
              </Collapsible.Trigger>
            </div>
            <Separator className="my-2" />
            <div className="mt-4">
              <p>Route 1</p>
              <p>Route 2</p>
              <p>Route 3</p>
            </div>
          </div>
        </Collapsible.Content>
      </Collapsible.Root>
      <main
        className={`transition-margin mt-13 flex-1 p-4 duration-300 ${open ? "ml-64" : "ml-0"}`}
      >
        {children}
      </main>
    </div>
  );
};

export { DashboardLayout };
