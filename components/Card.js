import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import * as globalStyles from "../Styles";

export default Card = ({ children }) => {
  return <ScrollView style={styles.card}>{children}</ScrollView>;
};

const styles = StyleSheet.create({
  card: {
    ...globalStyles.boxShadow,
    backgroundColor: globalStyles.colors.white,
    color: globalStyles.colors.black,
    height: "80%",
    width: "100%",
    borderRadius: globalStyles.cornerRadius,
    paddingBottom: 20,
  },
});
