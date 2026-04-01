"use client"

import { useState } from "react"

const navItems = [
  { label: "main", href: "#main", hoverColor: "#e8a0b4" },
  { label: "about", href: "#about", hoverColor: "#a8b8e0" },
  { label: "service", href: "#service", hoverColor: "#d4c090" },
  { label: "gallery", href: "#gallery", hoverColor: "#e0b8a0" },
  { label: "book", href: "#book", hoverColor: "#b0d0c8" },
  { label: "contact", href: "#contact", hoverColor: "#c8a8d8" },
]

export function SideNavigation() {
  const [activeItem, setActiveItem] = useState("main")
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const handleClick = (e: React.MouseEvent, item: typeof navItems[0]) => {
    e.preventDefault()
    setActiveItem(item.label)
    const target = document.querySelector(item.href)
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <nav
      className="fixed left-6 top-1/2 z-50 -translate-y-1/2 lg:left-10 xl:left-14"
      aria-label="Main navigation"
    >
      <ul className="flex flex-col gap-3">
        {navItems.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              onClick={(e) => handleClick(e, item)}
              onMouseEnter={() => setHoveredItem(item.label)}
              onMouseLeave={() => setHoveredItem(null)}
              className="group flex items-center gap-1.5 text-base tracking-wide lg:text-lg font-medium cursor-pointer"
              style={{
                color:
                  hoveredItem === item.label
                    ? item.hoverColor
                    : activeItem === item.label
                      ? "#1a1a1a"
                      : "rgba(26,26,26,0.6)",
                transition: "color 0.4s ease, transform 0.3s ease, text-shadow 0.4s ease",
                transform: hoveredItem === item.label ? "translateX(4px)" : "translateX(0)",
                textShadow:
                  hoveredItem === item.label
                    ? `0 0 18px ${item.hoverColor}80, 0 0 40px ${item.hoverColor}40`
                    : "none",
              }}
            >
              <span
                style={{
                  color:
                    hoveredItem === item.label
                      ? item.hoverColor
                      : "rgba(26,26,26,0.4)",
                  transition: "color 0.4s ease",
                }}
              >
                /
              </span>
              <span>{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
