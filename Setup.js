import React, { useEffect } from "react";
import { Text, StyleSheet, View } from "react-native";
import { SettingsForm } from "./SettingsForm";
import Card from "./components/Card";
import Wrapper from "./components/Wrapper";
import { NextButton } from "./components/NextButton";
import * as globalStyles from "./Styles";

export const Setup = () => {
  return (
    <Wrapper>
      <Text style={style.header}>Set up mom's information</Text>
      <Card>
        <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
          <SettingsForm />
        </View>
        <View
          style={{
            alignItems: "center",
            position: "absolute",
            bottom: -45,
            width: "100%",
          }}
        >
          <NextButton />
        </View>
      </Card>
    </Wrapper>
  );
};

const style = StyleSheet.create({
  header: globalStyles.header,
});
