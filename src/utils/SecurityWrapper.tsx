import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useRefreshMutation } from "../features/user/userActions";
import { useEffect } from "react";
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

type Props = {
  clearance: ClearanceLevels;
  isExclusive?: boolean;
  children: JSX.Element;
};

const SecurityWrapper = ({
  clearance,
  isExclusive = false,
  children,
}: Props) => {
  const user = useAuth();

  if (clearance === "Guest") {
    if (isExclusive && !user.isAuthenticated) {
      return <>{children}</>;
    } else {
      return <></>;
    }
  }
  if (clearance === "User") {
    if (!user.isAuthenticated) {
      return <></>;
    }
    return <>{children}</>;
  }
  if (clearance === "Verified") {
    if (!user.isAuthenticated) {
      return <></>;
    }
    if (!user.isVerified) {
      return <></>;
    }
    return <>{children}</>;
  }
  // if (clearance === "Subscribed") {
  //   if (!user.isAuthenticated) {
  //     return;
  //   }
  //   if (!user.isVerified) {
  //     return;
  //   }
  //   if (!user.isSubscribed) {
  //     return;
  //   }
  //   return {props.children};
  // }
  // if (clearance === "Creator") {
  //   if (!user.isAuthenticated) {
  //     return;
  //   }
  //   if (!user.isVerified) {
  //     return;
  //   }
  //   if (!user.isSubscribed) {
  //     return;
  //   }
  //   if (!user.isCreator) {
  //     return;
  //   }
  //   return {props.children};
  // }
  // if (clearance === "Moderator") {
  //   if (!user.isAuthenticated) {
  //     return;
  //   }
  //   if (!user.isVerified) {
  //     return;
  //   }
  //   if (!user.isSubscribed) {
  //     return;
  //   }
  //   if (!user.isCreator) {
  //     return;
  //   }
  //   if (!user.isModerator) {
  //     return;
  //   }
  //   return {props.children};
  // }
  return <>{children}</>;
};

export default SecurityWrapper;
