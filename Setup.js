import React, { useEffect } from "react";
import { Text, StyleSheet, View } from "react-native";
import { SettingsForm } from "./SettingsForm";
import Card from "./components/Card";
import Wrapper from "./components/Wrapper";
import * as globalStyles from "./Styles";

export const Setup = () => {
  return (
    <Wrapper>
      <Text style={style.header}>Set up mom's information</Text>
      <Card>
        <SettingsForm />
      </Card>
    </Wrapper>
  );
};

const style = StyleSheet.create({
  header: globalStyles.header,
});
