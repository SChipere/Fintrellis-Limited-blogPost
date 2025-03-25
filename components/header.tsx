"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { BookOpen, Home, PenSquare, Menu, X } from "lucide-react"
import { useState } from "react"

export default function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const routes = [
    {
      href: "/",
      label: "Home",
      icon: Home,
      active: pathname === "/",
    },
    {
      href: "/create",
      label: "Create Post",
      icon: PenSquare,
      active: pathname === "/create",
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="rounded-md bg-primary p-1">
              <BookOpen className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg hidden md:inline-block">Blog Manager</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1 ml-6">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-colors relative",
                  route.active ? "text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted",
                )}
              >
                {route.active && (
                  <motion.div
                    className="absolute inset-0 bg-primary/10 rounded-md z-[-1]"
                    layoutId="activeNav"
                    transition={{ type: "spring", duration: 0.6 }}
                  />
                )}
                <div className="flex items-center gap-2">
                  <route.icon className="h-4 w-4" />
                  {route.label}
                </div>
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <ModeToggle />
          <Button asChild className="hidden md:flex">
            <Link href="/create">
              <PenSquare className="mr-2 h-4 w-4" />
              New Post
            </Link>
          </Button>

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div
          className="md:hidden border-t"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="container py-4 flex flex-col gap-4">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "px-4 py-3 rounded-md text-sm font-medium flex items-center gap-3",
                  route.active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted",
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                <route.icon className="h-5 w-5" />
                {route.label}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  )
}

