"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ImageIcon, MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "~/components/ui/button"
import { cn } from "~/lib/utils"

export default function Navbar() {
  const pathname = usePathname()
  const { setTheme, resolvedTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 w-full glass">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <ImageIcon className="h-6 w-6" />
            <span className="font-bold">ImageCompressor</span>
          </Link>

          <nav className="ml-6 hidden md:flex gap-6">
            <Link
              href="/"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/" ? "text-foreground" : "text-muted-foreground",
              )}
            >
              Home
            </Link>
            <Link
              href="/compress"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/compress" ? "text-foreground" : "text-muted-foreground",
              )}
            >
              Compress
            </Link>
            <Link
              href="/convert"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/convert" ? "text-foreground" : "text-muted-foreground",
              )}
            >
              Convert to Schematic
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              // Use the resolved theme to determine what to switch to
              const newTheme = resolvedTheme === "dark" ? "light" : "dark"
              setTheme(newTheme)
            }}
            aria-label="Toggle theme"
          >
            <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">
              {resolvedTheme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            </span>
          </Button>
        </div>
      </div>
    </header>
  )
}

