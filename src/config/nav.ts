import { MainNavItem } from "@/types/nav"

interface NavConfig {
  mainNav: MainNavItem[]
}

export const navConfig: NavConfig = {
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Browse models",
      href: "/browse",
    },
    {
      title: "Create model protocol",
      href: "/protocol/create",
    },
    {
      title: "My protocols",
      href: "/modeler/protocols",
    },
    {
      title: "Documentation",
      href: "/docs",
    },
  ]
}
