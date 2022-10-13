import React from "react";
import styles from "../../styles/layout/Header.module.scss";
import Logo from "./Logo";
import { useRouter } from "next/router";

type HeaderPropsType = {
  sideBarIsOpen: boolean;
  setSidebarOpen: (val: boolean) => void;
};

const Header = ({ sideBarIsOpen, setSidebarOpen }: HeaderPropsType) => {
  const router = useRouter();
  const openStyle = sideBarIsOpen ? styles.open : "";
  const logIn = async () => {
    await router.push("/login");
  };

  return (
    <header className={`${styles.header}`}>
      <div className={`${styles.burgerMenu}`}>
        <button
          onClick={() => setSidebarOpen(true)}
          className={`${styles.burgerContainer} ${openStyle}`}
        >
          <div className={styles.burgerBtn}></div>
          <span className={styles.menuLabel}>Menu</span>
        </button>
      </div>
      <div className={styles.headerBox}>
        <Logo />
      </div>
      <div className={`${styles.headerBox} ${styles.buttonWrapper}`}>
        <button onClick={logIn} className={styles.loginButton}>
          Register / Log in
        </button>
      </div>
    </header>
  );
};

export default Header;
