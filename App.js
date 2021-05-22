import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableOpacity,
  TextInput,
  Button,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

const call = (phoneNumber) => Linking.openURL(`tel:${phoneNumber}`);

// I want to know when it's been too long since I called my mom.
// Display and In-App view (it's been over 7 days)
// Display an In-App view (you have 2 days to call your mom)
// Push Notification for when it's been too long.

const Settings = ({ setPhoneNumber, phoneNumber, saveAndNav }) => {
  return (
    <View>
      <Text>Settings</Text>
      <TextInput
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        style={styles.input}
      />
      <Button title={"SAVE"} onPress={() => saveAndNav()} />
    </View>
  );
};

const whenShouldYouCallYourMom = (lastCalledTime) => {
  const thresholdDaysToCallMom = 7;
  const daysSinceCalledMom = moment().diff(moment(lastCalledTime), "days");

  // TODO handle one day and today case

  if (daysSinceCalledMom < thresholdDaysToCallMom) {
    return `you should call your mom within ${
      thresholdDaysToCallMom - daysSinceCalledMom
    } days`;
  } else {
    return "You should call your mom";
  }
};

const sendPushNotification = ({ token, title, body }) => {
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
      title,
      body,
    }),
  });
};

const Home = ({ callAndTrack, lastCalledTime }) => {
  const [token, setToken] = useState();

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
      sendPushNotification({
        token,
        title: "HELL YEAH",
        body: "CALL YOUR DANG MOM",
      });
    }
  }, [token]);

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);
  return (
    <>
      <Text>
        {lastCalledTime
          ? `You last called your mom at ${lastCalledTime}`
          : "You haven't called your mom"}
      </Text>
      <Text>{whenShouldYouCallYourMom(lastCalledTime)}</Text>
      <TouchableOpacity onPress={() => callAndTrack()}>
        <Text>Call you momma!</Text>
      </TouchableOpacity>
    </>
  );
};

const getStoredPhoneNumber = () => AsyncStorage.getItem("phoneNumber");

export default function App() {
  const [phoneNumber, setPhoneNumber] = useState();
  const [nav, setNav] = useState("settings");
  const [lastCalledTime, setLastCalledTime] = useState();

  useEffect(() => {
    async function setPhoneNumberAsStoredValue() {
      const storedNumber = await getStoredPhoneNumber();
      setPhoneNumber(storedNumber);
    }
    setPhoneNumberAsStoredValue();
  });

  const savePhoneNumberAndNext = () => {
    setNav("Home");
    AsyncStorage.setItem("phoneNumber", phoneNumber);
  };

  const trackCallingMom = () => {
    const currentTime = new Date().toString();
    AsyncStorage.setItem("lastCalledTime", currentTime);
    setLastCalledTime(currentTime);
  };

  const callAndTrack = () => {
    call(getStoredPhoneNumber());
    trackCallingMom();
  };

  useEffect(() => {
    async function fetchLastCalledTime() {
      let time = await AsyncStorage.getItem("lastCalledTime");
      console.log(time);
      setLastCalledTime(time);
    }
    fetchLastCalledTime();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {nav === "settings" || !phoneNumber ? (
        <Settings
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          saveAndNav={savePhoneNumberAndNext}
        />
      ) : (
        <Home callAndTrack={callAndTrack} lastCalledTime={lastCalledTime} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    width: 100,
    backgroundColor: "lightgray",
  },
});
