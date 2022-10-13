import React, { useState } from "react";
import Header from "./Header";
import styles from "../../styles/layout/Layout.module.scss";
import Filters from "./Filters";
import Sidebar from "./Sidebar";

type LayoutPropsType = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutPropsType) => {
  const [sideBarIsOpen, setSidebarOpen] = useState<boolean>(false);
  return (
    <>
      <Header sideBarIsOpen={sideBarIsOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar
        sideBarIsOpen={sideBarIsOpen}
        closeSidebar={() => setSidebarOpen(false)}
      />
      <main className={styles.main}>
        <div className={styles.placeholder} />
        <Filters />
        <div className={styles.content}>
          <div className={styles.container}>{children}</div>
        </div>
      </main>
    </>
  );
};

export default Layout;
