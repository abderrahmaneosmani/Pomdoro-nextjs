import React, { Fragment } from "react";
import Navbar from "./Navbar/Navbar";
function Layout({ children }) {
  return (
    <>
      <div className="bg-[url('https://picsum.photos/1200')] bg-no-repeat bg-cover bg-center absolute w-full z-0">
        <div className="relative mt-10 mb-10 ">
          <Navbar />
        </div>
        <main>{children}</main>
      </div>
    </>
  );
}

export default Layout;
