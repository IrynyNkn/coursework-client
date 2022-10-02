import React, {useState} from 'react';
import styles from '../../styles/layout/Header.module.scss';
import Sidebar from "./Sidebar";
import Logo from "./Logo";

const Header = () => {
  const [sideBarIsOpen, setSidebarOpen] = useState<boolean>(false);
  const openStyle = sideBarIsOpen ? styles.open : '';
  const logIn = () => {

  };

  return (
    <header className={`${styles.header} ${openStyle}`}>
      <div className={`${styles.burgerMenu}`}>
        <button
          onClick={() => setSidebarOpen(true)}
          className={`${styles.burgerContainer} ${openStyle}`}
        >
          <div className={styles.burgerBtn}></div>
          <span className={styles.menuLabel}>Menu</span>
        </button>
        <Sidebar sideBarIsOpen={sideBarIsOpen} closeSidebar={() => setSidebarOpen(false)}/>
      </div>
      <div className={styles.headerBox}>
        <Logo />
      </div>
      <div className={`${styles.headerBox} ${styles.buttonWrapper}`}>
        <button onClick={logIn} className={styles.loginButton}>Register / Log in</button>
      </div>
    </header>
  );
}

export default Header;