import { StatusBar } from "expo-status-bar";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { View, StyleSheet, SafeAreaView, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import { useDispatch, useSelector } from "react-redux";
import { setMomsPhoneNumber, setLastTimeCalledMom } from "./momSlice";
import { Navigation } from "./Navigation";

import { getStoredPhoneNumber } from "./getStoredPhoneNumber";
import * as globalStyles from "./Styles";
import { StorageKeys } from "./StorageKeys";
import { Routes } from "./Routes";
import { selectPhoneNumber } from "./selectors";
import { Setup } from "./Setup";

export function CallYourMom() {
  if (!StorageKeys || !Routes) {
    console.warn(StorageKeys, Routes);
    return <Text>Loading</Text>;
  }
  const phoneNumber = useSelector(selectPhoneNumber);

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
      let time = await AsyncStorage.getItem(StorageKeys.lastCallTime);
      setLastCalledTime(time);
    }
    setPhoneNumberAsStoredValue();
    fetchLastCalledTime();
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  if (!phoneNumber) {
    return <Setup />;
  }

  return (
    <>
      <StatusBar style="auto" />
      <Navigation />
      <SafeAreaView />
    </>
  );
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
