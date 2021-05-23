import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useDispatch, useSelector } from "react-redux";
import {
  setMomsPhoneNumber,
  setLastTimeCalledMom,
  setCallHistoryAction,
} from "./momSlice";
import { Navigation } from "./Navigation";
import * as globalStyles from "./Styles";

import { getStoredPhoneNumber } from "./getStoredPhoneNumber";
import { StorageKeys } from "./StorageKeys";
import { Routes } from "./Routes";
import { selectPhoneNumber } from "./selectors";
import { Setup } from "./Setup";

export function CallYourMom() {
  const phoneNumber = useSelector(selectPhoneNumber);

  const dispatch = useDispatch();
  const setPhoneNumber = (phNumber) => dispatch(setMomsPhoneNumber(phNumber));
  const setLastCalledTime = (time) => dispatch(setLastTimeCalledMom(time));
  const setCallHistory = (callHistory) =>
    dispatch(setCallHistoryAction(callHistory));

  useEffect(function loadInitialData() {
    async function setPhoneNumberAsStoredValue() {
      const storedNumber = await getStoredPhoneNumber();
      setPhoneNumber(storedNumber);
    }
    async function fetchLastCalledTime() {
      let time = await AsyncStorage.getItem(StorageKeys.lastCallTime);
      setLastCalledTime(time);
    }
    async function fetchCallHistory() {
      let callHistory = await AsyncStorage.getItem(StorageKeys.callHistory);
      if (callHistory) {
        setCallHistory(JSON.parse(callHistory));
      }
    }
    fetchCallHistory();
    setPhoneNumberAsStoredValue();
    fetchLastCalledTime();
  }, []);

  return (
    <>
      <StatusBar style="auto" />
      <SafeAreaView style={styles.container}>
        {phoneNumber ? <Navigation /> : <Setup />}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    ...globalStyles.centerContents,
    backgroundColor: globalStyles.colors.lavender,
  },
});
