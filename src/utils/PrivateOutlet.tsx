import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
// import { useRefreshMutation } from "../features/user/userActions";
// import { useEffect } from "react";
export enum ClearanceLevels {
  Guest = "Guest",
  User = "User",
  Verified = "Verified",
  Subscribed = "Subscribed",
  Premium = "Subscribed",
  Pro = "Subscribed",
  Editor = "Creator",
  Creator = "Creator",
  Publisher = "Creator",
  Moderator = "Moderator",
  Admin = "Admin",
}
interface ClearanceLevel {
  ClearanceLevel: ClearanceLevels;
}

export const PrivateOutlet: React.FC<ClearanceLevel> = (props) => {
  // const [refresh, { isLoading, isError }] = useRefreshMutation();
  const navigate = useNavigate();
  // useEffect(() => {
  //   refresh();
  // }, []);
  const clearanceLevel = props.ClearanceLevel;
  const user = useAuth();
  const location = useLocation();
  if (clearanceLevel === "Guest") {
    return <Outlet />;
  }
  if (clearanceLevel === "User") {
    if (!user.isAuthenticated) {
      return <Navigate to="/login" state={{ from: location }} />;
    }
    return <Outlet />;
  }
  if (clearanceLevel === "Verified") {
    if (!user.isAuthenticated) {
      return <Navigate to="/login" state={{ from: location }} />;
    }
    if (!user.isVerified) {
      return <Navigate to="/verify" state={{ from: location }} />;
    }
    return <Outlet />;
  }
  // if (clearanceLevel === "Subscribed") {
  //   if (!user.isAuthenticated) {
  //     return <Navigate to="/login" state={{ from: location }} />;
  //   }
  //   if (!user.isVerified) {
  //     return <Navigate to="/verify" state={{ from: location }} />;
  //   }
  //   if (!user.isSubscribed) {
  //     return <Navigate to="/subscribe" state={{ from: location }} />;
  //   }
  //   return <Outlet />;
  // }
  // if (clearanceLevel === "Creator") {
  //   if (!user.isAuthenticated) {
  //     return <Navigate to="/login" state={{ from: location }} />;
  //   }
  //   if (!user.isVerified) {
  //     return <Navigate to="/verify" state={{ from: location }} />;
  //   }
  //   if (!user.isSubscribed) {
  //     return <Navigate to="/subscribe" state={{ from: location }} />;
  //   }
  //   if (!user.isCreator) {
  //     return <Navigate to="/become-a-creator" state={{ from: location }} />;
  //   }
  //   return <Outlet />;
  // }
  // if (clearanceLevel === "Moderator") {
  //   if (!user.isAuthenticated) {
  //     return <Navigate to="/login" state={{ from: location }} />;
  //   }
  //   if (!user.isVerified) {
  //     return <Navigate to="/verify" state={{ from: location }} />;
  //   }
  //   if (!user.isSubscribed) {
  //     return <Navigate to="/subscribe" state={{ from: location }} />;
  //   }
  //   if (!user.isCreator) {
  //     return <Navigate to="/become-a-creator" state={{ from: location }} />;
  //   }
  //   if (!user.isModerator) {
  //     return <Navigate to="/become-a-moderator" state={{ from: location }} />;
  //   }
  //   return <Outlet />;
  // }
  return <Outlet />;
};
