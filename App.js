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

// track when user clicks call your mom.
// display the last time user clicked call your mom.

// "lastTimeUserCalledMom"

export default function App() {
  const [phone, setPhone] = useState("");
  const [nav, setNav] = useState("settings");
  const [lastCalledTime, setLastCalledTime] = useState();

  const saveAndNav = () => {
    setNav("Home");
    AsyncStorage.setItem("phoneNumber", phone);
  };

  const track = () => {
    // record current datetime in asyncstorage
    const currentTime = new Date().toString();
    console.log("setting last called time", currentTime);
    AsyncStorage.setItem("lastCalledTime", currentTime);
    setLastCalledTime(currentTime);
  };

  const callAndTrack = () => {
    const phoneNumber = AsyncStorage.getItem("phoneNumber");
    call(phoneNumber);
    track();
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
      {nav === "settings" ? (
        <View>
          <Text>Settings</Text>
          <TextInput
            onChangeText={setPhone}
            value={phone}
            style={styles.input}
          />
          <Button title={"SAVE"} onPress={() => saveAndNav()} />
        </View>
      ) : (
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
      )}
      <StatusBar style="auto" />
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
