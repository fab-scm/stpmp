'use client'

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ThemeToggle } from "./theme-toggle";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";
import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  ProfileButton
} from "@/components/auth-buttons.component";

import { EarthIcon, LineChartIcon } from "lucide-react";
import { useSession } from "next-auth/react"

export function SiteHeader() {
  const { data: session, status } = useSession()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <EarthIcon size={32} strokeWidth={1} />
          <LineChartIcon size={32} strokeWidth={1} />
          <span className="hidden font-bold sm:inline-block">
            {siteConfig.name}
          </span>
        </Link>
        <MainNav />
        <MobileNav />
        <div className="flex items-center space-x-2">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* <CommandMenu /> */}
          </div>
          <NavigationMenu className="flex flex-1 items-center space-x-2">
            <NavigationMenuList className="flex items-center">
              <NavigationMenuItem>
                {status === "authenticated" ? <SignOutButton /> : <SignInButton /> }
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href={siteConfig.links.github}
                  rel="noreferrer"
                  target="_blank"
                  className={navigationMenuTriggerStyle()}
                >
                  <GitHubLogoIcon />
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <ThemeToggle />
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </header>
  );
}
