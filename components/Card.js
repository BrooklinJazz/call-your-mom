import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import * as globalStyles from "../Styles";

export default Card = ({ children, height = "80%" }) => {
  return <View style={{ ...styles.card, height }}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    ...globalStyles.boxShadow,
    backgroundColor: globalStyles.colors.white,
    color: globalStyles.colors.black,
    width: "100%",
    borderRadius: globalStyles.cornerRadius,
    paddingBottom: 20,
  },
});
