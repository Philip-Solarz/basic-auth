import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
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
  Stepper,
  LoadingOverlay,
} from "@mantine/core";
import { IconLock, IconMail } from "@tabler/icons";
import { useAppDispatch } from "../hooks";
import { IconArrowLeft } from "@tabler/icons";
import OtcInput from "../components/OtcInput";
const ResetPasswordPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otc, setOtc] = useState("");
  const onChange = (value: string) => setOtc(value);
  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));
  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <Container>
      <Title align="center" mb="1rem">
        Reset your password
      </Title>
      <Stepper active={active} onStepClick={setActive} breakpoint="sm">
        <Stepper.Step label="First step" description="Enter your email">
          <Paper
            shadow="md"
            radius="md"
            p="xl"
            mt="sm"
            withBorder
            style={{ position: "relative" }}
          >
            <Text align="center" color="dimmed">
              Step 1: Enter your email
            </Text>
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
                <Anchor size="sm" component={Link} to="/login">
                  <Center inline>
                    <IconArrowLeft style={{ marginRight: "0.25rem" }} />
                    Back to login page
                  </Center>
                </Anchor>
                <Button onClick={nextStep}>Next</Button>
              </Group>
            </form>
          </Paper>
        </Stepper.Step>
        <Stepper.Step
          label="Second step"
          description="Enter the verification code"
        >
          <Paper
            shadow="md"
            radius="md"
            p="xl"
            mt="sm"
            withBorder
            style={{ position: "relative" }}
          >
            <Text align="center" color="dimmed">
              Step 2: Enter the verification code that has been sent to your
              email
            </Text>
            <OtcInput value={otc} valueLength={6} onChange={onChange} />
            <Group position="apart" mt="lg">
              <Anchor size="sm" component={Link} to="/login">
                <Center inline>
                  <IconArrowLeft style={{ marginRight: "0.25rem" }} />
                  Back to login page
                </Center>
              </Anchor>
              <Button onClick={nextStep}>Next</Button>
            </Group>
          </Paper>
        </Stepper.Step>
        <Stepper.Step label="Final step" description="Choose your new password">
          <Paper
            shadow="md"
            radius="md"
            p="xl"
            mt="sm"
            withBorder
            style={{ position: "relative" }}
          >
            <Text align="center" color="dimmed">
              Step 3: Choose your new password
            </Text>
            <form>
              <PasswordInput
                label="New password"
                required
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
                description="Password must contain at least 8 characters, and include at least one letter and one number"
                icon={<IconLock />}
              />
              <PasswordInput
                label="Confirm new password"
                required
                // value={confirmPassword}
                // onChange={(e) => setConfirmPassword(e.target.value)}
                icon={<IconLock />}
              />
              <Group position="apart" mt="lg">
                <Anchor size="sm" component={Link} to="/login">
                  <Center inline>
                    <IconArrowLeft style={{ marginRight: "0.25rem" }} />
                    Back to login page
                  </Center>
                </Anchor>
                <Button onClick={nextStep}>Change password</Button>
              </Group>
            </form>
          </Paper>
        </Stepper.Step>
        <Stepper.Completed>
          <Navigate to="/login" />
        </Stepper.Completed>
      </Stepper>
    </Container>
  );
};

export default ResetPasswordPage;
