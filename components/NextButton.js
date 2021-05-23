import React from "react";
import { IconButton } from "react-native-paper";
import { colors } from "../Styles";

export const NextButton = (props) => {
  return (
    <IconButton
      size={50}
      style={{ backgroundColor: colors.purple }}
      color="white"
      icon={"chevron-right"}
      {...props}
    />
  );
};
