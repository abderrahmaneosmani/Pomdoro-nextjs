import Sider from "antd/lib/layout/Sider";
import React, { Fragment } from "react";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Navbar/Sidebar";
function Layout({ children }) {
  return (
    <>
      <div className="bg-[url('https://picsum.photos/1200')] bg-no-repeat bg-cover bg-center absolute w-full">
        <div className="relative mt-10 mb-10 ">
          <Navbar />
        </div>
        <main>{children}</main>
      </div>
    </>
  );
}

export default Layout;
