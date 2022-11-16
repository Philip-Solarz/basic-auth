import React from "react";
import { Container, Center } from "@mantine/core";
import { useAuth } from "../hooks/useAuth";
import SearchBar from "../components/SearchBar";
const HomePage: React.FC = () => {
  const user = useAuth();
  return (
    <Container>
      <SearchBar />
    </Container>
  );
};

export default HomePage;
