import React from "react";
import { View, StyleSheet } from "react-native";
import * as globalStyles from "../Styles";

export default Card = ({ children }) => {
  return <View style={styles.card}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    ...globalStyles.boxShadow,
    backgroundColor: globalStyles.colors.white,
    color: globalStyles.colors.black,
    height: "80%",
    width: "100%",
    borderRadius: globalStyles.cornerRadius,
  },
});
