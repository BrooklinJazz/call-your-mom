import React from "react";
import { TouchableOpacity, View, Image } from "react-native";
import { useDispatch } from "react-redux";
import { setNavigation } from "./momSlice";
import { Entypo } from "@expo/vector-icons";
import { Routes } from "./Routes";

export const Footer = () => {
  const dispatch = useDispatch();
  const navigate = (route) => dispatch(setNavigation(route));
  return (
    <View
      style={{
        justifyContent: "space-around",
        flexDirection: "row",
        alignItems: "center",
        marginTop: "auto",
        height: "15%",
        width: "100%",
      }}
    >
      <TouchableOpacity
        onPress={() => navigate(Routes.CallHistory)}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Entypo name="phone" size={32} color="black" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigate(Routes.Home)}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Image source={require("./assets/logo.png")} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigate(Routes.Settings)}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Entypo name="cog" size={32} color="black" />
      </TouchableOpacity>
    </View>
  );
};
