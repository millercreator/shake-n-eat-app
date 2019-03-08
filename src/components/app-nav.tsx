"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"

// ================
// Navigation constants
// ================
const TOP_NAV_HEIGHT = "4rem"
const BOTTOM_NAV_HEIGHT = "4rem"
const SCROLL_THRESHOLD = 10 // pixels to scroll before hiding/showing top nav

// ================
// Context and Types
// ================
type MobileNavContextProps = {
  isMobile: boolean
  topNavVisible: boolean
  setTopNavVisible: (visible: boolean) => void
  scrollDirection: "up" | "down" | null
}

const MobileNavContext = React.createContext<MobileNavContextProps | null>(null)

function useMobileNav() {
  const context = React.useContext(MobileNavContext)
  if (!context) {
    throw new Error("useMobileNav must be used within a MobileNavProvider.")
  }
  return context
}

// ================
// Provider Component
// ================
function MobileNavProvider({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  const isMobile = useIsMobile()
  const [topNavVisible, setTopNavVisible] = React.useState(true)
  const [scrollDirection, setScrollDirection] = React.useState<"up" | "down" | null>(null)
  const lastScrollY = React.useRef(0)

  // Handle scroll detection for top nav visibility
  React.useEffect(() => {
    if (!isMobile) return

    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Only update if scrolled enough to avoid jitter
      if (Math.abs(currentScrollY - lastScrollY.current) < SCROLL_THRESHOLD) {
        return
      }

      if (currentScrollY > lastScrollY.current && currentScrollY > SCROLL_THRESHOLD) {
        // Scrolling down - hide top nav
        setScrollDirection("down")
        setTopNavVisible(false)
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling up - show top nav
        setScrollDirection("up")
        setTopNavVisible(true)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isMobile])

  const contextValue = React.useMemo<MobileNavContextProps>(
    () => ({
      isMobile,
      topNavVisible,
      setTopNavVisible,
      scrollDirection,
    }),
    [isMobile, topNavVisible, scrollDirection]
  )

  return (
    <MobileNavContext.Provider value={contextValue}>
      <div
        data-slot="mobile-nav-wrapper"
        style={
          {
            "--top-nav-height": TOP_NAV_HEIGHT,
            "--bottom-nav-height": BOTTOM_NAV_HEIGHT,
          } as React.CSSProperties
        }
        className={cn("relative min-h-svh w-full", className)}
        {...props}
      >
        {children}
      </div>
    </MobileNavContext.Provider>
  )
}

// ================
// Top Navigation Component
// ================
function TopNav({
  className,
  children,
  ...props
}: React.ComponentProps<"header">) {
  const { isMobile, topNavVisible } = useMobileNav()

  if (!isMobile) {
    return null
  }

  return (
    <header
      data-slot="top-nav"
      data-mobile-nav="top"
      data-visible={topNavVisible}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-neutral-100 dark:bg-neutral-900 border-b border-border transition-transform duration-300 ease-in-out",
        topNavVisible ? "translate-y-0" : "-translate-y-full",
        className
      )}
      style={
        {
          height: "var(--top-nav-height)",
        } as React.CSSProperties
      }
      {...props}
    >
      {children}
    </header>
  )
}

// ================
// Bottom Navigation Component
// ================
function BottomNav({
  className,
  children,
  ...props
}: React.ComponentProps<"nav">) {
  const { isMobile } = useMobileNav()

  if (!isMobile) {
    return null
  }

  return (
    <nav
      data-slot="bottom-nav"
      data-mobile-nav="bottom"
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 bg-neutral-100 dark:bg-neutral-900 border-t border-border",
        className
      )}
      style={
        {
          height: "var(--bottom-nav-height)",
        } as React.CSSProperties
      }
      {...props}
    >
      {children}
    </nav>
  )
}

// ================
// Content Wrapper Component
// ================
function MobileNavContent({
  className,
  children,
  ...props
}: React.ComponentProps<"main">) {
  const { isMobile } = useMobileNav()

  return (
    <main
      data-slot="mobile-nav-content"
      className={cn(
        "w-full flex-1",
        isMobile && "pb-[var(--bottom-nav-height)] pt-[var(--top-nav-height)]",
        className
      )}
      {...props}
    >
      {children}
    </main>
  )
}

// ================
// Bottom Nav Item Component
// ================
function BottomNavItem({
  className,
  asChild = false,
  isActive = false,
  children,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean
  isActive?: boolean
}) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="bottom-nav-item"
      data-mobile-nav="bottom-item"
      data-active={isActive}
      className={cn(
        "flex flex-col items-center justify-center gap-1 flex-1 h-full text-xs transition-colors",
        isActive
          ? "text-foreground"
          : "text-muted-foreground hover:text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  )
}

// ================
// Top Nav Content Component
// ================
function TopNavContent({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="top-nav-content"
      data-mobile-nav="top-content"
      className={cn(
        "flex items-center justify-between h-full px-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// ================
// Bottom Nav Content Component
// ================
function BottomNavContent({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="bottom-nav-content"
      data-mobile-nav="bottom-content"
      className={cn(
        "flex items-center justify-around h-full px-2",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export {
  MobileNavProvider,
  TopNav,
  BottomNav,
  MobileNavContent,
  BottomNavItem,
  TopNavContent,
  BottomNavContent,
  useMobileNav,
}
