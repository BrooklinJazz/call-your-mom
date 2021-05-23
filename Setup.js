import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import { SettingsForm } from "./SettingsForm";
import Card from "./components/Card";
import Wrapper from "./components/Wrapper";
import { NextButton } from "./components/NextButton";
import * as globalStyles from "./Styles";
import { useDispatch } from "react-redux";
import { setMomsPhoneNumber, setNavigation } from "./momSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Routes } from "./Routes";

export const Setup = () => {
  const [tempPhoneNumber, setTempPhoneNumber] = useState("");
  const dispatch = useDispatch();
  const setNav = (route) => dispatch(setNavigation(route));
  const saveAndNav = () => {
    dispatch(setMomsPhoneNumber(tempPhoneNumber));
    setNav(Routes.Home);
    AsyncStorage.setItem("phoneNumber", tempPhoneNumber);
  };
  return (
    <Wrapper>
      <Text style={globalStyles.header}>Set up mom's information</Text>
      <Card>
        <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
          <SettingsForm
            tempPhoneNumber={tempPhoneNumber}
            setTempPhoneNumber={setTempPhoneNumber}
          />
        </View>
        <View
          style={{
            alignItems: "center",
            position: "absolute",
            bottom: -45,
            width: "100%",
          }}
        >
          <NextButton onPress={saveAndNav} />
        </View>
      </Card>
    </Wrapper>
  );
};