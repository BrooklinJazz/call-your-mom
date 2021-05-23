import React from "react";
import { View, StyleSheet } from "react-native";

export const Card = ({ children }) => {
  return <View style={styles.card}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: globalStyles.colors.white,
    color: globalStyles.colors.black,
    height: "90vh",
    width: "90vw",
  },
});
