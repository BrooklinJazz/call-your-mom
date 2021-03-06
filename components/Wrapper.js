import React from "react";
import { View, StyleSheet } from "react-native";
import * as globalStyles from "../Styles";

export default Wrapper = ({ children }) => {
  return <View style={style.wrapper}>{children}</View>;
};

const style = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: "10%",
  },
});
