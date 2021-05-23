import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setMomsPhoneNumber, setLastTimeCalledMom } from "./momSlice";
import { Navigation } from "./Navigation";

import { getStoredPhoneNumber } from "./getStoredPhoneNumber";

export function CallYourMom() {
  const dispatch = useDispatch();
  const setPhoneNumber = (phNumber) => dispatch(setMomsPhoneNumber(phNumber));
  const setLastCalledTime = (time) => dispatch(setLastTimeCalledMom(time));

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
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
