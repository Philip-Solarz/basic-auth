import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
// import { useRefreshMutation } from "../features/user/userActions";
// import { useEffect } from "react";
export enum ClearanceLevels {
  Guest = 0,
  User = 100,
  Verified = 200,
  Subscribed = 300,
  Admin = 999,
}
interface ClearanceLevel {
  ClearanceLevel: ClearanceLevels;
}

export enum UserType {
  Guest = 0,
  User = 100,
  Verified = 200,
  Subscribed = 300,
  Admin = 999,
}

type Props = {
  // clearance: ClearanceLevels;
  allowedUserTypes: UserType[];
  // elseSendTo: string;
  // isExclusive?: boolean;
};

export const PrivateOutlet = ({ allowedUserTypes }: Props) => {
  const navigate = useNavigate();
  const user = useAuth();
  const location = useLocation();

  let userType = UserType.Guest;
  if (user.isAuthenticated) userType = UserType.User;
  if (user.isVerified) userType = UserType.Verified;

  if (allowedUserTypes.includes(userType)) {
    return <Outlet />;
  } else if (userType > Math.max(...allowedUserTypes)) {
    return <Navigate to="/" state={{ from: location }} />;
  } else if (userType < 100) {
    return <Navigate to="/login" state={{ from: location }} />;
  } else if (userType < 200) {
    return <Navigate to="/verify" state={{ from: location }} />;
  } else if (userType < 300) {
    return <Navigate to="/subscribe" state={{ from: location }} />;
  } else {
    return <Navigate to="/" state={{ from: location }} />;
  }

  // const clearanceRequried = clearance;
  // let userClearance = 0;
  // if (user.isAuthenticated) userClearance = 100;
  // if (user.isVerified) userClearance = 200;
  // if (userClearance === clearanceRequried) {
  //   return <Outlet />;
  // } else if (userClearance > clearanceRequried) {
  //   return <Navigate to="/" state={{ from: location }} />;
  // } else if (clearanceRequried > userClearance) {
  //   if (userClearance < 100) {
  //     return <Navigate to="/login" state={{ from: location }} />;
  //   } else if (userClearance >= 100 && userClearance < 200) {
  //     return <Navigate to="/verify" state={{ from: location }} />;
  //   } else if (userClearance >= 200 && userClearance < 300) {
  //     return <Navigate to="/subscribe" state={{ from: location }} />;
  //   }
  // }

  // if (clearance === "Guest") {
  //   if (isExclusive && !user.isAuthenticated) {
  //     return <Outlet />;
  //   } else {
  //     return <Navigate to="/" state={{ from: location }} />;
  //   }
  // }
  // if (clearance === "User") {
  //   if (!user.isAuthenticated) {
  //     return <Navigate to="/login" state={{ from: location }} />;
  //   } else {
  //     if (isExclusive && user.isVerified) {
  //       return <Navigate to="/" state={{ from: location }} />;
  //     }
  //   }
  //   return <Outlet />;
  // }
  // if (clearance === "Verified") {
  //   if (!user.isAuthenticated) {
  //     return <Navigate to="/login" state={{ from: location }} />;
  //   }
  //   if (!user.isVerified) {
  //     return <Navigate to="/verify" state={{ from: location }} />;
  //   }
  //   return <Outlet />;
  // }
  // return <Outlet />;
  // useEffect(() => {
  //   refresh();
  // }, []);
  // const clearanceLevel = props.ClearanceLevel;

  // if (clearanceLevel === "Guest") {
  //   return <Outlet />;
  // }
  // if (clearanceLevel === "User") {
  //   if (!user.isAuthenticated) {
  //     return <Navigate to="/login" state={{ from: location }} />;
  //   }
  //   return <Outlet />;
  // }
  // if (clearanceLevel === "Verified") {
  //   if (!user.isAuthenticated) {
  //     return <Navigate to="/login" state={{ from: location }} />;
  //   }
  //   if (!user.isVerified) {
  //     return <Navigate to="/verify" state={{ from: location }} />;
  //   }
  //   return <Outlet />;
  // }
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
  // return <Outlet />;
};
