import React, { useState } from "react";
import { Image, View } from "react-native";
import { Title } from "react-native-paper";
import { Setup } from "./Setup";
import { NextButton } from "./components/NextButton";

const Welcome = ({ onNext }) => {
  return (
    <View
      style={{
        backgroundColor: "white",
        height: "100%",
        width: "100%",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <Image source={require("./assets/OnboardingWelcome.png")} />
      <Title style={{ width: "40%", textAlign: "center" }}>
        Helping you keep in contact with your mom
      </Title>
      <NextButton onPress={onNext} />
    </View>
  );
};

export const Onboarding = () => {
  const [displayWelcome, setDisplayWelcome] = useState(true);

  return displayWelcome ? (
    <Welcome onNext={() => setDisplayWelcome(false)} />
  ) : (
    <Setup />
  );
};
