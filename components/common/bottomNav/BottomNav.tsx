"use client"
import React from "react"
import Link from "next/link"
import s from "./bottomNav.module.css"
import type { SideMenuProps } from "@/components/common/sideMenu/sideMenu"

interface BottomNavProps {
  currentPage: SideMenuProps["currentPage"]
  onCreateEvent?: () => void
}

const BottomNav: React.FC<BottomNavProps> = ({
  currentPage,
  onCreateEvent,
}) => {
  return (
    <nav className={s.bottomNav} aria-label="Navigation mobile">
      <Link
        href="/events"
        className={[
          s.navItem,
          currentPage === "Home" ? s.navItemActive : "",
        ].join(" ")}
        aria-current={currentPage === "Home" ? "page" : undefined}
      >
        <span className={s.navIcon} aria-hidden="true">
          🏠
        </span>
        <span>Accueil</span>
      </Link>

      <Link
        href="#"
        className={[
          s.navItem,
          currentPage === "My events" ? s.navItemActive : "",
        ].join(" ")}
      >
        <span className={s.navIcon} aria-hidden="true">
          📅
        </span>
        <span>Sorties</span>
      </Link>

      <button
        className={s.fab}
        onClick={onCreateEvent}
        aria-label="Créer un événement"
      >
        +
      </button>

      <Link
        href="#"
        className={[
          s.navItem,
          currentPage === "Messages" ? s.navItemActive : "",
        ].join(" ")}
      >
        <span className={s.navIcon} aria-hidden="true">
          💬
        </span>
        <span>Messages</span>
      </Link>

      <Link
        href="/account"
        className={[
          s.navItem,
          currentPage === "Profile" ? s.navItemActive : "",
        ].join(" ")}
        aria-current={currentPage === "Profile" ? "page" : undefined}
      >
        <span className={s.navIcon} aria-hidden="true">
          👤
        </span>
        <span>Profil</span>
      </Link>
    </nav>
  )
}

export default BottomNav
