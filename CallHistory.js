import React from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import { Footer } from "./Footer";
import { selectCallHistory } from "./selectors";
export const CallHistory = () => {
  const callHistory = useSelector(selectCallHistory);
  return (
    <View style={{ width: "100%" }}>
      {callHistory.map((each, i) => (
        <Text key={i}>{each}</Text>
      ))}
      <Footer />
    </View>
  );
};
