import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import ResetPasswordPage from "./pages/ResetPassword";
import SignupPage from "./pages/Signup";
import HomePage from "./pages/Home";
import ProfilePage from "./pages/Profile";
import SettingsPage from "./pages/Settings";
import AdminPage from "./pages/Admin";
import VerifyEmailPage from "./pages/VerifyEmail";
import SearchResultsPage from "./pages/SearchResults";
import { PrivateOutlet, UserType } from "./utils/PrivateOutlet";
import { useEffect } from "react";
import { useRefreshMutation } from "./features/user/userActions";

import Layout from "./layout/Layout";

const App: React.FC = () => {
  const [refresh] = useRefreshMutation();
  useEffect(() => {
    refresh();
  }, []);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<HomePage />} />
          <Route
            path="/verify"
            element={
              <PrivateOutlet
                allowedUserTypes={[UserType.User, UserType.Admin]}
              />
            }
          >
            <Route index element={<VerifyEmailPage />} />
          </Route>
          <Route
            path="/profile"
            element={
              <PrivateOutlet
                allowedUserTypes={[
                  UserType.Verified,
                  UserType.Subscribed,
                  UserType.Admin,
                ]}
              />
            }
          >
            <Route index element={<ProfilePage />} />
          </Route>
          <Route
            path="/settings"
            element={
              <PrivateOutlet
                allowedUserTypes={[
                  UserType.User,
                  UserType.Verified,
                  UserType.Subscribed,
                  UserType.Admin,
                ]}
              />
            }
          >
            <Route index element={<SettingsPage />} />
          </Route>
          <Route
            path="/search"
            element={
              <PrivateOutlet
                allowedUserTypes={[
                  UserType.User,
                  UserType.Verified,
                  UserType.Subscribed,
                  UserType.Admin,
                ]}
              />
            }
          >
            <Route index element={<SearchResultsPage />} />
          </Route>
          <Route
            path="/admin"
            element={<PrivateOutlet allowedUserTypes={[UserType.Admin]} />}
          >
            <Route index element={<AdminPage />} />
          </Route>
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
