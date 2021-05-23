import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, Platform, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { useDispatch, useSelector } from "react-redux";
import { setLastTimeCalledMom } from "./momSlice";
import { selectLastCalledTime, selectPhoneNumber } from "./selectors";
import { call } from "./call";
import moment from "moment";
import { Entypo } from "@expo/vector-icons";
const Footer = () => {
  return (
    <View
      style={{
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        marginTop: "auto",
        height: "15%",
        width: "100%",
        backgroundColor: "green",
      }}
    >
      <Entypo
        onPress={() => console.log("Touched")}
        name="phone"
        size={32}
        color="black"
      />
      <Entypo
        onPress={() => console.log("Touched")}
        name="phone"
        size={32}
        color="black"
      />
      <Entypo
        onPress={() => console.log("Touched")}
        name="cog"
        size={32}
        color="black"
      />
    </View>
  );
};

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
  const phoneNumber = useSelector(selectPhoneNumber);

  const trackCallingMom = () => {
    const currentTime = new Date().toString();
    AsyncStorage.setItem("lastCalledTime", currentTime);
    setLastCalledTime(currentTime);
  };

  const callAndTrack = () => {
    call(phoneNumber);
    trackCallingMom();
  };
  const sendNotification = ({ token }) => {
    fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        host: "exp.host",
        accept: "application/json",
        "accept-encoding": "gzip, deflate",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        to: token,
        title: "From App",
        body: "World",
      }),
    });
  };
  const registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      setToken(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
  };

  useEffect(() => {
    if (token) {
      sendNotification({ token });
    }
  }, [token]);

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);
  return (
    <View style={{ height: "100%", width: "100%" }}>
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
    </View>
  );
};
