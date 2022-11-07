import { Container } from "@mantine/core";
import React from "react";
import HeaderComponent, { Link } from "./Header";

const links: Link[] = [
  { link: "/about", label: "Features" },
  {
    link: "#1",
    label: "Learn",
    links: [
      { link: "/docs", label: "Documentation" },
      { link: "/resources", label: "Resources" },
      { link: "/community", label: "Community" },
      { link: "/blog", label: "Blog" },
    ],
  },
  { link: "/about", label: "About" },
  { link: "/pricing", label: "Pricing" },
  {
    link: "#2",
    label: "Support",
    links: [
      { link: "/faq", label: "FAQ" },
      { link: "/demo", label: "Book a demo" },
      { link: "/forums", label: "Forums" },
    ],
  },
];

const Layout = (properties: React.PropsWithChildren) => {
  return (
    <Container fluid>
      <HeaderComponent links={links} />
      {properties.children}
    </Container>
  );
};

export default Layout;
