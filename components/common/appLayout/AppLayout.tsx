import React from "react"
import s from "./appLayout.module.css"
import SideMenu from "@/components/common/sideMenu/sideMenu"
import type { SideMenuProps } from "@/components/common/sideMenu/sideMenu"
import BottomNav from "@/components/common/bottomNav/BottomNav"

interface AppLayoutProps {
  currentPage: SideMenuProps["currentPage"]
  children: React.ReactNode
  onCreateEvent?: () => void
}

const AppLayout: React.FC<AppLayoutProps> = ({
  currentPage,
  children,
  onCreateEvent,
}) => {
  return (
    <div className={s.root}>
      <div className={s.sidebar}>
        <SideMenu currentPage={currentPage} />
      </div>
      <main className={s.main}>{children}</main>
      <div className={s.mobileNav}>
        <BottomNav currentPage={currentPage} onCreateEvent={onCreateEvent} />
      </div>
    </div>
  )
}

export default AppLayout
