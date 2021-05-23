import React from "react";
import { Text, View, TextInput, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { setMomsPhoneNumber, setNavigation } from "./momSlice";
import { selectPhoneNumber } from "./selectors";
import { Routes } from "./Navigation";

export const Settings = () => {
  const dispatch = useDispatch();
  const setPhoneNumber = (phNumber) => dispatch(setMomsPhoneNumber(phNumber));
  const phoneNumber = useSelector(selectPhoneNumber);
  const setNav = (route) => dispatch(setNavigation(route));
  const saveAndNav = () => {
    setNav(Routes.Home);
    AsyncStorage.setItem("phoneNumber", phoneNumber);
  };
  return (
    <View>
      <Text>Settings</Text>
      {/* <Slider /> */}
      <TextInput
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        style={styles.input}
      />
      <Button title={"SAVE"} onPress={() => saveAndNav()} />
    </View>
  );
};

export const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 100,
    backgroundColor: "lightgray",
  },
});
