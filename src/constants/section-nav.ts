export const sectionNavItems = [
  { label: "Main", href: "#main" },
  { label: "About", href: "#about" },
  { label: "Service", href: "#service" },
  { label: "Gallery", href: "#gallery" },
  { label: "Book", href: "#book" },
  { label: "Contact", href: "#contact" },
] as const

export type SectionNavItem = (typeof sectionNavItems)[number]
