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

export enum UserType {
  Guest = 0,
  User = 100,
  Verified = 200,
  Subscribed = 300,
  Admin = 999,
}

type Props = {
  allowedUserTypes: UserType[];
  // clearance: ClearanceLevels;
  // isExclusive?: boolean;
  children: JSX.Element;
};

const SecurityWrapper = ({
  allowedUserTypes,
  // clearance,
  // isExclusive = false,
  children,
}: Props) => {
  const user = useAuth();
  let userType = UserType.Guest;
  if (user.isAuthenticated) userType = UserType.User;
  if (user.isVerified) userType = UserType.Verified;

  if (allowedUserTypes.includes(userType)) {
    return <>{children}</>;
  } else {
    return <></>;
  }

  // if (clearance === "Guest") {
  //   if (isExclusive && !user.isAuthenticated) {
  //     return <>{children}</>;
  //   } else {
  //     return <></>;
  //   }
  // }
  // if (clearance === "User") {
  //   if (!isExclusive && user.isAuthenticated) {
  //     return <>{children}</>;
  //   }
  //   if (isExclusive && !user.isVerified) {
  //     return <>{children}</>;
  //   }
  //   return <></>;
  // }
  // if (clearance === "Verified") {
  //   if (!user.isAuthenticated) {
  //     return <></>;
  //   }
  //   if (!user.isVerified) {
  //     return <></>;
  //   }
  //   return <>{children}</>;
  // }
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
  // return <>{children}</>;
};

export default SecurityWrapper;
