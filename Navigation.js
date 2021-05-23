import React from "react";
import { useSelector } from "react-redux";
import { selectNavigation as selectCurrentRoute } from "./selectors";
import { Home } from "./Home";
import { Setup } from "./Setup";
import { Settings } from "./Settings";
import { Routes } from "./Routes";

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
      <View />;
  }
};
