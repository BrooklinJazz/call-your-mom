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
    height: "90%",
    width: "90%",
    borderRadius: globalStyles.cornerRadius,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
