import React from 'react';
import Header from "./Header";

type LayoutPropsType = {
  children: React.ReactNode
}

const Layout = ({children}: LayoutPropsType) => {
  return (
    <>
      <Header />
      <main>
        {children}
      </main>
    </>
  );
};

export default Layout;