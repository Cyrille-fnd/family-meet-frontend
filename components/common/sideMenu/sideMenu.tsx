import React from "react"
import s from "./sideMenu.module.css"
import Link from "next/link"
import Image from "next/image"

export interface SideMenuProps {
  currentPage: "Home" | "Profile" | "My events" | "Messages" | "Members"
}

const NAV_ITEMS = [
  {
    key: "Home",
    label: "Accueil",
    href: "/events",
    icon: "/icon-home.png",
    alt: "Accueil",
  },
  {
    key: "Profile",
    label: "Mon profil",
    href: "/account",
    icon: "/icon-user-dark.png",
    alt: "Profil",
  },
  {
    key: "My events",
    label: "Mes sorties",
    href: "#",
    icon: "/icon-calendar.png",
    alt: "Sorties",
  },
  {
    key: "Messages",
    label: "Messages",
    href: "#",
    icon: "/icon-messages.png",
    alt: "Messages",
  },
  {
    key: "Members",
    label: "Membres",
    href: "#",
    icon: "/icon-members.png",
    alt: "Membres",
  },
] as const

const SideMenu: React.FC<SideMenuProps> = ({ currentPage }) => {
  return (
    <aside className={s.container}>
      <Link href="/events" className={s.brand}>
        <Image
          priority
          src="/FAMILY.png"
          width={40}
          height={40}
          alt="Family Meet"
          className={s.brandLogo}
        />
        <span className={s.brandName}>Family Meet</span>
      </Link>

      <nav className={s.nav} aria-label="Navigation principale">
        {NAV_ITEMS.map(({ key, label, href, icon, alt }) => {
          const isActive = currentPage === key
          return (
            <Link
              key={key}
              href={href}
              className={[s.navItem, isActive ? s.navItemActive : ""].join(" ")}
              aria-current={isActive ? "page" : undefined}
            >
              <Image src={icon} width={22} height={22} alt={alt} />
              <span>{label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

export default SideMenu
