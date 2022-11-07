import React from "react";
import { Container } from "@mantine/core";
import { useAuth } from "../hooks/useAuth";

const HomePage: React.FC = () => {
  const user = useAuth();
  return <Container>{user.isAuthenticated && <p>{user.email}</p>}</Container>;
};

export default HomePage;
