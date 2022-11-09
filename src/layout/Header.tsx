import {
  createStyles,
  Menu,
  Center,
  Header,
  Container,
  Group,
  Button,
  Burger,
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons";
// import { useAuth } from "../hooks/useAuth";
import { logout } from "../features/user/userSlice";
import { useAppDispatch } from "../hooks";
import SecurityWrapper, { ClearanceLevels } from "../utils/SecurityWrapper";
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

const HeaderComponent: React.FC<{ links: Link[] }> = ({ links }) => {
  // const user = useAuth();
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
        <Group>
          <SecurityWrapper clearance={ClearanceLevels.Guest} isExclusive>
            <Button variant="default" component={Link} to="/login">
              Log in
            </Button>
          </SecurityWrapper>
          <SecurityWrapper clearance={ClearanceLevels.Guest} isExclusive>
            <Button component={Link} to="/signup">
              Sign up
            </Button>
          </SecurityWrapper>
          <SecurityWrapper clearance={ClearanceLevels.Verified}>
            <Button component={Link} to="/subscribe">
              Subscribe
            </Button>
          </SecurityWrapper>
          <SecurityWrapper clearance={ClearanceLevels.User}>
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

          {/* {!user.isAuthenticated && (
            <Button variant="default" component={Link} to="/login">
              Log in
            </Button>
          )}
          {!user.isAuthenticated && (
            <Button component={Link} to="/signup">
              Sign up
            </Button>
          )}
          {user.isAuthenticated && (
            <Button component={Link} to="/subscribe">
              Subscribe
            </Button>
          )}
          {user.isAuthenticated && (
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
          )} */}
        </Group>
      </Container>
    </Header>
  );
};

export default HeaderComponent;
