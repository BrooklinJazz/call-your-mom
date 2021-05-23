import React from "react";
import { useSelector } from "react-redux";
import { selectNavigation as selectCurrentRoute } from "./selectors";
import { Settings } from "./Settings";
import { Home } from "./Home";

export const Navigation = () => {
  const currentRoute = useSelector(selectCurrentRoute);
  switch (currentRoute) {
    case "settings":
      return <Settings />;
    case "Home":
      return <Home />;
    default:
      break;
  }
};
