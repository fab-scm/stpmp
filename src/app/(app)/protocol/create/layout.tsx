import { Metadata } from "next";
import Image from "next/image";

import { Separator } from "@/components/ui/separator";
import { ProtocolSidebarNav } from "@/components/protocol-sidebar-nav";
import { ScrollArea } from "@/components/ui/scroll-area";

export const metadata: Metadata = {
  title: "Create a model protocol",
  description: "Create a model protocol of your environmental model.",
};

const sidebarNavItems = [
  {
    title: "General",
    href: "/protocol/create/general",
  },
  {
    title: "Data",
    href: "/protocol/create/data",
  },
  {
    title: "Model",
    href: "/protocol/create/model",
  },
  {
    title: "Validation",
    href: "/protocol/create/validation",
  },
  {
    title: "Interpretation",
    href: "/protocol/create/interpretation",
  },
  {
    title: "Uncertainty",
    href: "/protocol/create/uncertainty",
  },
  {
    title: "Workflow",
    href: "/protocol/create/workflow",
  },
];

interface CreateProtocolLayoutProps {
  children: React.ReactNode;
}

export default function CreateProtocolLayout({
  children,
}: CreateProtocolLayoutProps) {
  return (
    <div className="border-b">
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <ScrollArea className="h-full py-6 pr-6 lg:py-8">
            <ProtocolSidebarNav items={sidebarNavItems} />
          </ScrollArea>
        </aside>
        {children}
      </div>
    </div>
    // <div className="container space-y-6 p-10 pb-16 md:block border-b">
    //   {/* <div className="sticky top-0 space-y-0.5">
    //     <h2 className="text-2xl font-bold tracking-tight">Model protocol</h2>
    //     <p className="text-muted-foreground">
    //       Create a model protocol of your environmental model.
    //     </p>
    //   </div>
    //   <Separator className="my-6" /> */}
    //   <div className="flex flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
    //     <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-30rem)] w-full shrink-0 md:sticky md:block">
    //       <ScrollArea className="h-full">
    //         
    //       </ScrollArea>
    //     </aside>
    //     <div className="flex-1 lg:max-w-2xl px-1">{children}</div>
    //   </div>
    // </div>
  );
}