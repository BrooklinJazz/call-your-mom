import React from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import { Footer } from "./Footer";
import { selectCallHistory } from "./selectors";
export const CallHistory = () => {
  const callHistory = useSelector(selectCallHistory);
  return (
    <>
      {callHistory.map((each) => (
        <Text key={each}>{each}</Text>
      ))}
      <Footer />
    </>
  );
};
