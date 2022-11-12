import {
  createStyles,
  Menu,
  Center,
  Header,
  Container,
  Group,
  Button,
  Burger,
  Avatar,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { forwardRef } from "react";
import { useDisclosure } from "@mantine/hooks";
import {
  IconChevronDown,
  IconSettings,
  IconLogout,
  IconUserPlus,
  IconPremiumRights,
  IconUserCheck,
} from "@tabler/icons";
// import { useAuth } from "../hooks/useAuth";
import { logout } from "../features/user/userSlice";
import { useAppDispatch } from "../hooks";
import SecurityWrapper, { UserType } from "../utils/SecurityWrapper";
import { useAuth } from "../hooks/useAuth";
const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
  inner: {
    height: HEADER_HEIGHT,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkLabel: {
    marginRight: 5,
  },
}));

interface Link2 {
  link: string;
  label: string;
}

export interface Link {
  link: string;
  label: string;
  links?: Link2[];
}

interface UserButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  // image: string;
  name: string;
  email: string;
  icon?: React.ReactNode;
}

const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
  ({ name, email, icon, ...others }: UserButtonProps, ref) => (
    <UnstyledButton
      ref={ref}
      sx={(theme) => ({
        display: "block",
        width: "100%",

        color:
          theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
      })}
      {...others}
    >
      <Group>
        <Avatar radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="sm" weight={500}>
            {name}
          </Text>

          <Text color="dimmed" size="xs">
            {email}
          </Text>
        </div>

        {icon || <IconChevronDown size={16} />}
      </Group>
    </UnstyledButton>
  )
);

const HeaderComponent: React.FC<{ links: Link[] }> = ({ links }) => {
  const user = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { classes } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);
  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>{item.label}</Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" exitTransitionDuration={0}>
          <Menu.Target>
            <a
              href={link.link}
              className={classes.link}
              onClick={(event) => event.preventDefault()}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size={12} stroke={1.5} />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <a
        key={link.label}
        href={link.link}
        className={classes.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </a>
    );
  });

  return (
    <Header height={HEADER_HEIGHT} mb="md">
      <Container className={classes.inner} fluid>
        <Group>
          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="sm"
          />
        </Group>
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>

        {/* 
          <SecurityWrapper allowedUserTypes={[UserType.User]}>
            <Button component={Link} to="/verify">
              Verify
            </Button>
          </SecurityWrapper>
          <SecurityWrapper allowedUserTypes={[UserType.Verified]}>
            <Button component={Link} to="/subscribe">
              Subscribe
            </Button>
          </SecurityWrapper>
          <SecurityWrapper
            allowedUserTypes={[
              UserType.User,
              UserType.Verified,
              UserType.Subscribed,
              UserType.Admin,
            ]}
          >
            <Button
              variant="default"
              type="button"
              onClick={() => {
                dispatch(logout());
                navigate("/");
              }}
            >
              Logout
            </Button>
          </SecurityWrapper>
           */}
        {/* </Group> */}
        <Group position="center">
          <SecurityWrapper allowedUserTypes={[UserType.Guest]}>
            <Button variant="default" component={Link} to="/login">
              Log in
            </Button>
          </SecurityWrapper>
          <SecurityWrapper allowedUserTypes={[UserType.Guest]}>
            <Button component={Link} to="/signup">
              Sign up
            </Button>
          </SecurityWrapper>
          <SecurityWrapper
            allowedUserTypes={[
              UserType.User,
              UserType.Verified,
              UserType.Subscribed,
              UserType.Admin,
            ]}
          >
            <Menu
              trigger="hover"
              openDelay={100}
              closeDelay={100}
              width="target"
              position="bottom-end"
            >
              <Menu.Target>
                <UserButton name={user.firstName!} email={user.email!} />
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>Application</Menu.Label>
                <Menu.Item
                  icon={<IconSettings size={14} />}
                  component={Link}
                  to="/settings"
                >
                  Settings
                </Menu.Item>
                <SecurityWrapper allowedUserTypes={[UserType.Verified]}>
                  <Menu.Item
                    icon={<IconUserCheck size={14} />}
                    component={Link}
                    to="/verify"
                  >
                    Get verified
                  </Menu.Item>
                </SecurityWrapper>
                <SecurityWrapper allowedUserTypes={[UserType.Verified]}>
                  <Menu.Item
                    icon={<IconUserPlus size={14} />}
                    component={Link}
                    to="/subscribe"
                  >
                    Subscribe
                  </Menu.Item>
                </SecurityWrapper>

                <Menu.Divider />
                <Menu.Item
                  color="red"
                  icon={<IconLogout size={14} />}
                  onClick={() => {
                    dispatch(logout());
                    navigate("/");
                  }}
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </SecurityWrapper>
        </Group>
      </Container>
    </Header>
  );
};

export default HeaderComponent;
