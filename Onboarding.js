import React, { useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { Title } from "react-native-paper";
import { Setup } from "./Setup";
import { IconButton } from "react-native-paper";
import { colors } from "./Styles";

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
      <IconButton
        onPress={onNext}
        size={50}
        style={{ backgroundColor: colors.purple }}
        color="white"
        icon={"chevron-right"}
      />
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
