import React, { useState } from "react";
import { Text, View, TextInput, Button, StyleSheet, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";

import { setMomsPhoneNumber, setNavigation } from "./momSlice";
import { selectPhoneNumber } from "./selectors";
import { Routes } from "./Routes";
import * as globalStyles from "./Styles";

export const SettingsForm = () => {
  const [callInterval, setCallInterval] = useState("1");
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
      <View
        style={{
          ...styles.section,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Image
          style={globalStyles.smallIcon}
          source={require("./assets/phone.png")}
        />
        <TextInput
          onChangeText={setPhoneNumber}
          value={phoneNumber}
          style={styles.input}
          placeholder={"e.g. 123-456-7890"}
        />
        <Image
          style={globalStyles.smallIcon}
          source={require("./assets/edit.png")}
        />
      </View>
      <View
        style={{
          ...styles.section,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          style={globalStyles.smallIcon}
          source={require("./assets/birthday.png")}
        />
        <TextInput style={styles.input} placeholder={"e.g. 05/21/1965"} />
        <Image
          style={globalStyles.smallIcon}
          source={require("./assets/edit.png")}
        />
      </View>
      <View style={styles.section}>
        <Text>How often do you want to call mom?</Text>
        <View style={{ flexDirection: "row" }}>
          <Text>Every</Text>
          <TextInput
            value={callInterval}
            onChangeText={setCallInterval}
            style={styles.callIntervalInput}
          />
          <Text>day(s)</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text>Remind you to call mom on Mother's Day?</Text>
        <View style={{ flexDirection: "row" }}>
          <Button title={"YES"} onPress={() => {}} />
          <Button title={"NO"} onPress={() => {}} />
        </View>
      </View>
      <View>
        <Text>Remind you to call mom on her birthday?</Text>
        <View style={{ flexDirection: "row" }}>
          <Button title={"YES"} onPress={() => {}} />
          <Button title={"NO"} onPress={() => {}} />
        </View>
      </View>
      <Button title={"SAVE"} onPress={() => saveAndNav()} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    ...globalStyles.textInput,
    marginLeft: 20,
    height: 40,
    width: 100,
  },
  callIntervalInput: {
    ...globalStyles.textInput,
    height: 20,
    width: 40,
  },
  section: {
    borderBottomWidth: 1,
    borderBottomColor: globalStyles.colors.lightGray,
  },
});
