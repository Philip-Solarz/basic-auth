import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Title,
  Text,
  Anchor,
  Paper,
  TextInput,
  PasswordInput,
  Group,
  Checkbox,
  Button,
  LoadingOverlay,
} from "@mantine/core";
import { IconLock, IconMail } from "@tabler/icons";
import { useLoginMutation } from "../features/user/userActions";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [login, { isLoading }] = useLoginMutation();

  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const credentials = {
        email,
        password,
        rememberMe,
      };
      await login(credentials);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <Title align="center">Welcome back!</Title>
      <Text align="center" color="dimmed">
        Don't have an account?{" "}
        <Anchor component={Link} to="/signup">
          Sign up
        </Anchor>
      </Text>
      <Paper
        shadow="md"
        radius="md"
        p="xl"
        mt="sm"
        withBorder
        style={{ position: "relative" }}
      >
        <form onSubmit={onFormSubmit}>
          <LoadingOverlay visible={isLoading} />
          <TextInput
            label="Email"
            required={true}
            icon={<IconMail />}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <PasswordInput
            label="Password"
            required={true}
            icon={<IconLock />}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <Group position="apart" mt="md">
            <Checkbox
              label="Remember me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <Anchor component={Link} to="/reset-password">
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="md" type="submit">
            Log in
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginPage;
