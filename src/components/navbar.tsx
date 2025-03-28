"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ImageIcon, Menu, MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

import { Button } from "~/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu"
import { cn } from "~/lib/utils"

export default function Navbar() {
  const pathname = usePathname()
  const { setTheme, resolvedTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)

  // After mounting, we can safely show the UI that depends on the theme
  useEffect(() => {
    setMounted(true)
  }, [])

  // Track scroll position to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Check initial position

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [scrolled])

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/compress", label: "Compress" },
    { href: "/convert", label: "Convert" },
  ]

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-white/80 backdrop-blur-md border-b border-gray-200 dark:bg-brand-dark/80 dark:border-zinc-800"
          : "bg-white dark:bg-black",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-brand-yellow flex items-center justify-center glow-yellow">
              <ImageIcon className="h-4 w-4 text-black" />
            </div>
            <span className="font-bold text-gray-900 dark:text-white">ImageCompressor</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 absolute left-1/2 transform -translate-x-1/2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors",
                pathname === item.href
                  ? "text-gray-900 dark:text-white"
                  : "text-gray-600 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-white",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {/* Theme toggle on desktop */}
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                const newTheme = resolvedTheme === "dark" ? "light" : "dark"
                setTheme(newTheme)
              }}
              aria-label="Toggle theme"
              className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:text-white/90 dark:hover:bg-white/10 md:flex hidden"
            >
              <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">
                {resolvedTheme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
              </span>
            </Button>
          )}

          {/* Mobile Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:text-white/90 dark:hover:bg-white/10"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-[200px] bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 text-gray-900 dark:text-white"
            >
              {navItems.map((item) => (
                <DropdownMenuItem
                  key={item.href}
                  asChild
                  className="text-gray-700 focus:text-gray-900 focus:bg-gray-100 dark:text-zinc-300 dark:focus:text-white dark:focus:bg-zinc-800"
                >
                  <Link href={item.href}>{item.label}</Link>
                </DropdownMenuItem>
              ))}
              {mounted && (
                <DropdownMenuItem
                  className="focus:text-gray-900 focus:bg-gray-100 dark:focus:text-white dark:focus:bg-zinc-800"
                  onSelect={(e: Event) => {
                    e.preventDefault()
                  }}
                >
                  <div className="flex items-center justify-between w-full">
                    <span>Theme</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        const newTheme = resolvedTheme === "dark" ? "light" : "dark"
                        setTheme(newTheme)
                      }}
                      className="h-8 w-8 p-0 text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:text-white/90 dark:hover:bg-white/10"
                    >
                      <SunIcon className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                      <MoonIcon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                      <span className="sr-only">
                        {resolvedTheme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
                      </span>
                    </Button>
                  </div>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

