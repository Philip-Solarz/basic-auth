import { Container, AppShell, Navbar } from "@mantine/core";
import React from "react";
import SecurityWrapper, { UserType } from "../utils/SecurityWrapper";
import HeaderComponent, { Link } from "./Header";
import { NavbarNested } from "./Navbar";

const links: Link[] = [
  // { link: "/", label: "Home" },
  // { link: "/about", label: "About" },
  // {
  //   link: "#1",
  //   label: "Docs",
  //   links: [
  //     { link: "/docs", label: "Documentation" },
  //     { link: "/resources", label: "Resources" },
  //     { link: "/community", label: "Community" },
  //     { link: "/blog", label: "Blog" },
  //   ],
  // },
  // {
  //   link: "#2",
  //   label: "Tools",
  //   links: [
  //     { link: "/docs", label: "Documentation" },
  //     { link: "/resources", label: "Resources" },
  //     { link: "/community", label: "Community" },
  //     { link: "/blog", label: "Blog" },
  //   ],
  // },
  // {
  //   link: "#3",
  //   label: "Support",
  //   links: [
  //     { link: "/faq", label: "FAQ" },
  //     { link: "/demo", label: "Book a demo" },
  //     { link: "/forums", label: "Forums" },
  //   ],
  // },
];

const Layout = (properties: React.PropsWithChildren) => {
  return (
    <Container fluid>
      <HeaderComponent links={links} />
      {properties.children}
      {/* <FooterComponent /> */}
    </Container>
  );
};

export default Layout;
