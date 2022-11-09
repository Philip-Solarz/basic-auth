import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import ResetPasswordPage from "./pages/ResetPassword";
import SignupPage from "./pages/Signup";
import HomePage from "./pages/Home";
import ProfilePage from "./pages/Profile";
import { PrivateOutlet, ClearanceLevels } from "./utils/PrivateOutlet";
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
            path="/profile"
            element={
              <PrivateOutlet ClearanceLevel={ClearanceLevels.Verified} />
            }
          >
            <Route index element={<ProfilePage />} />
          </Route>
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
