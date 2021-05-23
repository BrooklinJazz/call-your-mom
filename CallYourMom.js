import { StatusBar } from "expo-status-bar";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import { setMomsPhoneNumber, setLastTimeCalledMom } from "./momSlice";
import { Navigation } from "./Navigation";

import { getStoredPhoneNumber } from "./getStoredPhoneNumber";
import * as globalStyles from "./Styles";

export function CallYourMom() {
  const dispatch = useDispatch();
  const setPhoneNumber = (phNumber) => dispatch(setMomsPhoneNumber(phNumber));
  const setLastCalledTime = (time) => dispatch(setLastTimeCalledMom(time));
  const [fontsLoaded] = useFonts({ Poppins_400Regular, Poppins_700Bold });

  useEffect(function loadInitialData() {
    async function setPhoneNumberAsStoredValue() {
      const storedNumber = await getStoredPhoneNumber();
      setPhoneNumber(storedNumber);
    }
    async function fetchLastCalledTime() {
      let time = await AsyncStorage.getItem("lastCalledTime");
      setLastCalledTime(time);
    }

    setPhoneNumberAsStoredValue();
    fetchLastCalledTime();
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <>
        <StatusBar style="auto" />
        <Navigation />
        <SafeAreaView />
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalStyles.colors.lavender,
    fontFamily: globalStyles.fonts?.regular || "Helvetica, Arial",
    alignItems: "center",
    justifyContent: "center",
  },
});
