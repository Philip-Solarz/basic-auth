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
  Center,
  LoadingOverlay,
} from "@mantine/core";
import { IconLock, IconMail } from "@tabler/icons";
import { useAppDispatch } from "../hooks";
import { IconArrowLeft } from "@tabler/icons";
const ResetPasswordPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <Container>
      <Title align="center">Reset your password</Title>
      <Text align="center" color="dimmed">
        Enter your email to get a reset link
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
          <LoadingOverlay visible={false} />
          <TextInput
            label="Email"
            required={true}
            icon={<IconMail />}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <Group position="apart" mt="lg">
            <Anchor color="dimmed" size="sm">
              <Center inline>
                <IconArrowLeft />
                <Anchor component={Link} to="/login">
                  Back to login page
                </Anchor>
              </Center>
            </Anchor>
            <Button>Reset password</Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
};

export default ResetPasswordPage;
