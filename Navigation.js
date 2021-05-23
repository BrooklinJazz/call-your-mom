import React from "react";
import { useSelector } from "react-redux";
import { selectNavigation as selectCurrentRoute } from "./selectors";
import { Home } from "./Home";
import { Setup } from "./Setup";
import { Settings } from "./Settings";
import { CallHistory } from "./CallHistory";
const Routes = {
  Settings: "Settings",
  Home: "Home",
  CallHistory: "CallHistory",
};
export const Navigation = () => {
  const currentRoute = useSelector(selectCurrentRoute);

  switch (currentRoute) {
    case Routes.Settings:
      return <Settings />;
    case Routes.Home:
      return <Home />;
    case Routes.CallHistory:
      return <CallHistory />;
    default:
      throw new Error(`Unknown Route: ${currentRoute}`);
  }
};
