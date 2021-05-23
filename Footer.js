import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setNavigation } from "./momSlice";
import { Routes } from "./Routes";
import { Surface } from "react-native-paper";
import { selectNavigation as selectCurrentRoute } from "./selectors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const Footer = () => {
  const dispatch = useDispatch();
  const navigate = (route) => dispatch(setNavigation(route));
  const currentRoute = useSelector(selectCurrentRoute);
  const isOn = (route) => currentRoute === route;

  const callHistoryIcon = isOn(Routes.CallHistory)
    ? require("./assets/phoneHistoryOn.png")
    : require("./assets/phoneHistoryOff.png");

  const homeIcon = isOn(Routes.Home)
    ? require("./assets/logoOn.png")
    : require("./assets/logoOff.png");

  const settingsIcon = isOn(Routes.Settings)
    ? require("./assets/settingOn.png")
    : require("./assets/settingOff.png");

  const { bottom } = useSafeAreaInsets();

  return (
    <Surface
      style={{
        paddingBottom: bottom,
        elevation: 12,
        justifyContent: "space-around",
        flexDirection: "row",
        alignItems: "center",
        justifySelf: "flex-end",
        height: "10%",
        width: "100%",
      }}
    >
      <TouchableOpacity
        onPress={() => navigate(Routes.CallHistory)}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Image source={callHistoryIcon} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigate(Routes.Home)}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Image source={homeIcon} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigate(Routes.Settings)}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Image source={settingsIcon} />
      </TouchableOpacity>
    </Surface>
  );
};
