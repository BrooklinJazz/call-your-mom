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
import { selectPhoneNumber } from "./selectors";
import { Onboarding } from "./Onboarding";

export function CallYourMom() {
  const phoneNumber = useSelector(selectPhoneNumber);

  return (
    <>
      <StatusBar style="auto" />
      <View style={styles.container}>
        {phoneNumber ? <Navigation /> : <Onboarding />}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    ...globalStyles.centerContents,
    backgroundColor: globalStyles.colors.lavender,
  },
});
