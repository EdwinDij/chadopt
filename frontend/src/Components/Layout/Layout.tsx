import React, { PropsWithChildren } from "react";
import { Footer, Navbar } from "../index";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
