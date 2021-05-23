import React, { useState } from "react";
import { Text, View, TextInput, StyleSheet, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Surface, Title, Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import {
  setMomsPhoneNumber,
  setNavigation,
  setShouldNotifyMomOnMothersDayAction,
  setShouldNotifyMomOnBirthdayAction,
  setMomsBirthdayAction,
  setFrequencyToCallMomInDaysAction,
} from "./momSlice";
import {
  selectPhoneNumber,
  selectMomsBirthday,
  selectShouldNotifyMomOnBirthday,
  selectShouldNotifyMomOnMothersDay,
  selectFrequencyToCallMomInDays,
} from "./selectors";
import * as globalStyles from "./Styles";

export const SettingsForm = ({ tempPhoneNumber, setTempPhoneNumber }) => {
  const setRemindOnMothersDay = (shouldRemind) =>
    dispatch(setShouldNotifyMomOnMothersDayAction(shouldRemind));

  const setRemindOnBirthday = (shouldRemind) =>
    dispatch(setShouldNotifyMomOnBirthdayAction(shouldRemind));

  const setMomsBirthday = (date) => dispatch(setMomsBirthdayAction(date));
  const setFrequencyToCallMomInDays = (date) =>
    dispatch(setFrequencyToCallMomInDaysAction(date));

  const momsBirthday = useSelector(selectMomsBirthday);
  const remindOnBirthday = useSelector(selectShouldNotifyMomOnBirthday);
  const remindOnMothersDay = useSelector(selectShouldNotifyMomOnMothersDay);
  const frequencyToCallMomInDays = useSelector(selectFrequencyToCallMomInDays);

  const dispatch = useDispatch();

  const getActiveColor = (isActive) =>
    isActive ? globalStyles.colors.purple : globalStyles.colors.medGray;

  return (
    <View>
      <View
        style={{
          ...styles.section,
          ...styles.bottomBorder,
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
          onChangeText={setTempPhoneNumber}
          value={tempPhoneNumber}
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
          ...styles.bottomBorder,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Image
          style={globalStyles.smallIcon}
          source={require("./assets/birthday.png")}
        />
        <TextInput
          style={styles.input}
          onChangeText={setMomsBirthday}
          value={momsBirthday}
          placeholder={"e.g. 05/21/1965"}
        />
        <Image
          style={globalStyles.smallIcon}
          source={require("./assets/edit.png")}
        />
      </View>
      <View style={{ ...styles.section, ...styles.bottomBorder }}>
        <Text style={styles.settingTitle}>
          How often do you want to call mom?
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Text>Every</Text>
          <TextInput
            value={frequencyToCallMomInDays}
            onChangeText={setFrequencyToCallMomInDays}
            style={styles.callIntervalInput}
          />
          <Text>day(s)</Text>
        </View>
      </View>
      <View style={{ ...styles.section, ...styles.bottomBorder }}>
        <Text style={styles.settingTitle}>
          Remind you to call mom on Mother's Day?
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Button
            style={{
              ...styles.button,
              backgroundColor: getActiveColor(remindOnMothersDay),
            }}
            mode={"contained"}
            onPress={() => setRemindOnMothersDay(true)}
          >
            Yes
          </Button>
          <Button
            style={{
              ...styles.button,
              backgroundColor: getActiveColor(!remindOnMothersDay),
            }}
            mode={"contained"}
            onPress={() => setRemindOnMothersDay(false)}
          >
            No
          </Button>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.settingTitle}>
          Remind you to call mom on her birthday?
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Button
            style={{
              ...styles.button,
              backgroundColor: getActiveColor(remindOnBirthday),
            }}
            mode={"contained"}
            onPress={() => setRemindOnBirthday(true)}
          >
            Yes
          </Button>
          <Button
            style={{
              ...styles.button,
              backgroundColor: getActiveColor(!remindOnBirthday),
            }}
            mode={"contained"}
            onPress={() => setRemindOnBirthday(false)}
          >
            No
          </Button>
        </View>
      </View>
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
    paddingLeft: 10,
    paddingRight: 10,
    marginHorizontal: 20,
  },
  section: {
    paddingVertical: 15,
    justifyContent: "center",
  },
  bottomBorder: {
    borderBottomWidth: 1,
    borderBottomColor: globalStyles.colors.lightGray,
  },
  settingTitle: {
    fontFamily: globalStyles.fonts.bold,
    fontSize: 18,
    paddingBottom: 15,
  },
  button: {
    ...globalStyles.button,
    height: 35,
    width: 105,
  },
});
