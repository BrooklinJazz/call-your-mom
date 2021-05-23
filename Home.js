import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, Platform, View, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { useDispatch, useSelector } from "react-redux";
import { Surface } from "react-native-paper";

import { setLastTimeCalledMom, addToCallHistoryAction } from "./momSlice";
import { selectLastCalledTime, selectPhoneNumber } from "./selectors";
import { call } from "./call";
import moment from "moment";
import { Footer } from "./Footer";
import { boxShadow, colors } from "./Styles";
export const whenShouldYouCallYourMom = (lastCalledTime) => {
  const thresholdDaysToCallMom = 7;
  const daysSinceCalledMom = moment().diff(moment(lastCalledTime), "days");

  // handle one day and today case

  if (daysSinceCalledMom < thresholdDaysToCallMom) {
    return `you should call your mom within ${
      thresholdDaysToCallMom - daysSinceCalledMom
    } days`;
  } else {
    return "You should call your mom";
  }
};

export const Home = () => {
  const dispatch = useDispatch();
  const [token, setToken] = useState();
  const lastCalledTime = useSelector(selectLastCalledTime);
  const setLastCalledTime = (time) => dispatch(setLastTimeCalledMom(time));
  const addToCallHistory = (time) => dispatch(addToCallHistoryAction(time));
  const phoneNumber = useSelector(selectPhoneNumber);

  const trackCallingMom = () => {
    const currentTime = new Date().toString();
    setLastCalledTime(currentTime);
    addToCallHistory(currentTime);
  };

  const callAndTrack = () => {
    call(phoneNumber);
    trackCallingMom();
  };
  // const sendNotification = ({ token }) => {
  //   fetch("https://exp.host/--/api/v2/push/send", {
  //     method: "POST",
  //     headers: {
  //       host: "exp.host",
  //       accept: "application/json",
  //       "accept-encoding": "gzip, deflate",
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       to: token,
  //       title: "From App",
  //       body: "World",
  //     }),
  //   });
  // };
  // const registerForPushNotificationsAsync = async () => {
  //   if (Constants.isDevice) {
  //     const { status: existingStatus } =
  //       await Notifications.getPermissionsAsync();
  //     let finalStatus = existingStatus;
  //     if (existingStatus !== "granted") {
  //       const { status } = await Notifications.requestPermissionsAsync();
  //       finalStatus = status;
  //     }
  //     if (finalStatus !== "granted") {
  //       alert("Failed to get push token for push notification!");
  //       return;
  //     }
  //     const token = (await Notifications.getExpoPushTokenAsync()).data;
  //     setToken(token);
  //   } else {
  //     alert("Must use physical device for Push Notifications");
  //   }

  //   if (Platform.OS === "android") {
  //     Notifications.setNotificationChannelAsync("default", {
  //       name: "default",
  //       importance: Notifications.AndroidImportance.MAX,
  //       vibrationPattern: [0, 250, 250, 250],
  //       lightColor: "#FF231F7C",
  //     });
  //   }
  // };

  // useEffect(() => {
  //   if (token) {
  //     sendNotification({ token });
  //   }
  // }, [token]);

  // useEffect(() => {
  //   registerForPushNotificationsAsync();
  // }, []);
  return (
    <View
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <Image
        style={{ width: "100%", height: "50%" }}
        source={require("./assets/PlaceholderMom.png")}
      />
      <Surface
        style={{
          elevation: 4,
          width: "100%",
          position: "absolute",
          bottom: 0,
          height: "55%",
          backgroundColor: colors.white,
          flex: 1,
          padding: 20,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        <Text>
          {lastCalledTime
            ? `You last called your mom at ${lastCalledTime}`
            : "You haven't called your mom"}
        </Text>
        <Text>{whenShouldYouCallYourMom(lastCalledTime)}</Text>
        <TouchableOpacity onPress={() => callAndTrack()}>
          <Text>Call you momma!</Text>
        </TouchableOpacity>
        <Footer />
      </Surface>
    </View>
  );
};
