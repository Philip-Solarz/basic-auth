import { Container } from "@mantine/core";
import SecurityWrapper, { UserType } from "../utils/SecurityWrapper";
import { NavbarNested } from "../layout/Navbar";
const SettingsPage: React.FC = () => {
  return (
    <Container fluid>
      <SecurityWrapper
        allowedUserTypes={[
          UserType.User,
          UserType.Verified,
          UserType.Subscribed,
          UserType.Admin,
        ]}
      >
        <NavbarNested />
      </SecurityWrapper>
    </Container>
  );
};

export default SettingsPage;
