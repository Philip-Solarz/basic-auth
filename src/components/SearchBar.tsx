import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextInput,
  Container,
  Button,
  Group,
  Title,
  ActionIcon,
  Center,
  Modal,
  Anchor,
  Tooltip,
  Drawer,
  useMantineTheme,
} from "@mantine/core";
import {
  IconSearch,
  IconSettings,
  IconAdjustments,
  IconInfoCircle,
} from "@tabler/icons";
import { Link } from "react-router-dom";
const SearchBar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const theme = useMantineTheme();
  const [isFilterModalOpened, setIsFiterModalOpened] = useState(false);
  return (
    <Container pt="4.5rem">
      <Center pb="1.5rem">
        <Title
          size={64}
          variant="gradient"
          style={{ letterSpacing: "0.25em", fontWeight: "300" }}
        >
          <Anchor component={Link} to="/" underline={false}>
            Multiplex
          </Anchor>
        </Title>
      </Center>
      <TextInput
        placeholder="Search"
        description={
          <Group position="apart">
            <Tooltip label="Search for anything" radius="md" color="blue">
              <ActionIcon variant="transparent">
                <IconInfoCircle size={18} />
              </ActionIcon>
            </Tooltip>

            <Group spacing={0}>
              <ActionIcon
                variant="transparent"
                onClick={() => setIsFiterModalOpened(true)}
              >
                <IconAdjustments size={18} />
              </ActionIcon>
              <ActionIcon variant="transparent">
                <IconSettings size={18} />
              </ActionIcon>
            </Group>
          </Group>
        }
        icon={<IconSearch size={18} stroke={1.5} />}
        radius="xl"
        size="xl"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Group position="apart" grow>
        <Button
          radius="xl"
          size="md"
          fullWidth={true}
          mt="2rem"
          variant="outline"
        >
          Ask a bot
        </Button>
        <Button
          radius="xl"
          size="md"
          fullWidth={true}
          mt="2rem"
          variant="gradient"
          onClick={() => {
            navigate(`/search?q=${searchQuery}`);
          }}
        >
          Search
        </Button>
      </Group>
      <Modal
        opened={isFilterModalOpened}
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        onClose={() => setIsFiterModalOpened(false)}
        overlayOpacity={0.55}
        overlayBlur={3}
        radius="xl"
        withCloseButton={false}
        // position="bottom"
      >
        {/* Modal content */}
      </Modal>
    </Container>
  );
};

export default SearchBar;
