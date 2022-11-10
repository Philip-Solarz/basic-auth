import React, { useState, createRef } from "react";
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
  NumberInput,
  Button,
  Center,
  LoadingOverlay,
} from "@mantine/core";
import { IconLock, IconMail } from "@tabler/icons";
import { useAppDispatch } from "../hooks";
import { IconArrowLeft } from "@tabler/icons";
import OtcInput from "../components/OtcInput";
import {
  useGetVerificationCodeMutation,
  usePostVerificationCodeMutation,
} from "../features/user/userActions";
const VerifyEmailPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [otc, setOtc] = useState("");
  const [getVerificationCode] = useGetVerificationCodeMutation();
  const [postVerificationCode] = usePostVerificationCodeMutation();

  const onChange = (value: string) => setOtc(value);

  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(otc);
    try {
      await postVerificationCode(otc);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Title align="center">Verify your email</Title>
      <Text align="center" color="dimmed">
        Enter the verification code that has been sent to your email
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
          <OtcInput value={otc} valueLength={6} onChange={onChange} />
          <Group position="apart" mt="lg">
            <Center inline>
              <Anchor
                // color="dimmed"
                size="sm"
                component={Link}
                to="#"
                onClick={() => getVerificationCode()}
              >
                Send new verification code
              </Anchor>
            </Center>
            <Button type="submit">Verify</Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
};

export default VerifyEmailPage;
