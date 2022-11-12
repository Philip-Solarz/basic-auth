import { Container, AppShell, Navbar } from "@mantine/core";
import React from "react";
import SecurityWrapper, { UserType } from "../utils/SecurityWrapper";
import HeaderComponent, { Link } from "./Header";
import { NavbarNested } from "./Navbar";

const links: Link[] = [
  { link: "/", label: "Home" },
  { link: "/about", label: "About" },
  {
    link: "#1",
    label: "Docs",
    links: [
      { link: "/docs", label: "Documentation" },
      { link: "/resources", label: "Resources" },
      { link: "/community", label: "Community" },
      { link: "/blog", label: "Blog" },
    ],
  },
  {
    link: "#2",
    label: "Tools",
    links: [
      { link: "/docs", label: "Documentation" },
      { link: "/resources", label: "Resources" },
      { link: "/community", label: "Community" },
      { link: "/blog", label: "Blog" },
    ],
  },
  {
    link: "#3",
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
      <AppShell
        padding="md"
        navbar={
          <SecurityWrapper
            allowedUserTypes={[
              UserType.User,
              UserType.Verified,
              UserType.Subscribed,
              UserType.Admin,
            ]}
          >
            <NavbarNested />
          </SecurityWrapper>
        }
        header={<HeaderComponent links={links} />}
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
      >
        {properties.children}
      </AppShell>
    </Container>
  );
};

export default Layout;
