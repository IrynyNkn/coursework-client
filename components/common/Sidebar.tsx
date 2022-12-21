import React, { useRef } from 'react';
import styles from '../../styles/layout/Sidebar.module.scss';
import clickAwayListener from '../../utils/hooks/clickAwayListener';
import { useRouter } from 'next/router';

type SidebarPropsType = {
  sideBarIsOpen: boolean;
  closeSidebar: () => void;
};

const Sidebar = ({ sideBarIsOpen, closeSidebar }: SidebarPropsType) => {
  const router = useRouter();
  const sidebarRef = useRef(null);
  clickAwayListener(sidebarRef, sideBarIsOpen, closeSidebar);
  const openStyle = sideBarIsOpen ? styles.open : '';

  const onNavClick = async (path: string) => {
    await router.push(path);
    closeSidebar();
  };

  return (
    <div className={`${styles.overlay} ${openStyle}`}>
      <div ref={sidebarRef} className={`${styles.sidebar} ${openStyle}`}>
        <div className={styles.closeBtnContainer}>
          <button onClick={closeSidebar} className={styles.closeButton}>
            <span className={styles.closeLabel}>close</span>
            <svg
              className={styles.closeIcon}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512">
              <path d="M294.6 166.6L317.3 144 272 98.7l-22.6 22.6L160 210.7 70.6 121.4 48 98.7 2.7 144l22.6 22.6L114.7 256 25.4 345.4 2.7 368 48 413.3l22.6-22.6L160 301.3l89.4 89.4L272 413.3 317.3 368l-22.6-22.6L205.3 256l89.4-89.4z" />
            </svg>
          </button>
        </div>
        <ul className={styles.menu}>
          <li
            className={styles.menuItem}
            onClick={() => onNavClick('/games-management')}>
            Games Management
          </li>
          <li className={styles.menuItem}>Users</li>
          <li className={styles.menuItem}>Liked</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
