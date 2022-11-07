import React, { useState } from "react";
import { useAppDispatch } from "../hooks";
import {
  useSignupMutation,
  useIdentifyMutation,
} from "../features/user/userActions";
import { useNavigate, Link } from "react-router-dom";

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
  LoadingOverlay,
  Button,
} from "@mantine/core";
import { IconLock, IconAt, IconUser, IconMail } from "@tabler/icons";

const SignupPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [signup, { isLoading: isSignupLoading }] = useSignupMutation();
  const [identify, { isLoading: isIdentifyLoading }] = useIdentifyMutation();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const credentials = {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      };
      await signup(credentials);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Title align="center">Create a new account</Title>
      <Text align="center" color="dimmed">
        Already have an account?{" "}
        <Anchor component={Link} to="/login">
          Log in
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
        <form onSubmit={onSubmit}>
          <LoadingOverlay visible={isSignupLoading && isIdentifyLoading} />
          <Group grow>
            <TextInput
              label="First name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              icon={<IconUser />}
            />
            <TextInput
              label="Last name"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              icon={<IconUser />}
            />
          </Group>
          <TextInput
            label="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<IconMail />}
          />
          <PasswordInput
            label="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            description="Password must contain at least 8 characters, and include at least one letter and one number"
            icon={<IconLock />}
          />
          <PasswordInput
            label="Confirm password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            icon={<IconLock />}
          />
          <Button fullWidth mt="md" type="submit">
            Sign up
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default SignupPage;
