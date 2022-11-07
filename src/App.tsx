import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import ResetPasswordPage from "./pages/ResetPassword";
import SignupPage from "./pages/Signup";
import HomePage from "./pages/Home";
import ProfilePage from "./pages/Profile";
import { PrivateOutlet } from "./utils/PrivateOutlet";

import Layout from "./layout/Layout";

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<PrivateOutlet />}>
            <Route index element={<ProfilePage />} />
          </Route>
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
