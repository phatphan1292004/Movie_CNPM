import React from "react";
import { Header } from "./header";
import Footer from "./footer/Footer";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen text-white">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
