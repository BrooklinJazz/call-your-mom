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
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const call = (phoneNumber) => Linking.openURL(`tel:${phoneNumber}`);

// I want to know when it's been too long since I called my mom.
// Display and In-App view (it's been over 7 days)
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

const Home = ({ callAndTrack, lastCalledTime }) => {
  return (
    <>
      <Text>
        {lastCalledTime
          ? `You last called your mom at ${lastCalledTime}`
          : "You haven't called your mom"}
      </Text>
      <TouchableOpacity onPress={() => callAndTrack()}>
        <Text>Call you momma!</Text>
      </TouchableOpacity>
    </>
  );
};

const getStoredPhoneNumber = () => AsyncStorage.getItem("phoneNumber");

export default function App() {
  const [phoneNumber, setPhoneNumber] = useState(getStoredPhoneNumber());
  const [nav, setNav] = useState("settings");
  const [lastCalledTime, setLastCalledTime] = useState();

  const savePhoneNumberAndNext = () => {
    setNav("Home");
    AsyncStorage.setItem("phoneNumber", phoneNumber);
  };

  const trackCallingMom = () => {
    // record current datetime in asyncstorage
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
      {nav === "settings" ? (
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
