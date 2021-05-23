import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { Navigation } from "./Navigation";
import { Onboarding } from "./Onboarding";
import { selectPhoneNumber } from "./selectors";
import * as globalStyles from "./Styles";
import { persistor } from "./store";
export function CallYourMom() {
  const phoneNumber = useSelector(selectPhoneNumber);
  // persistor.purge();
  // console.warn(persistor.getState());
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
