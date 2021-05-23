import React from "react";
import { useSelector } from "react-redux";
import { selectNavigation as selectCurrentRoute } from "./selectors";
import { Home } from "./Home";

export const Routes = {
  Settings: "Settings",
  Home: "Home",
  Setup: "Setup",
};

export const Navigation = () => {
  const currentRoute = useSelector(selectCurrentRoute);
  switch (currentRoute) {
    case Routes.Setup:
      return <Setup />;
    case Routes.Settings:
      return <Settings />;
    case Routes.Home:
      return <Home />;
    default:
      break;
  }
};
