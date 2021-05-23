import React from "react";
import { Footer } from "./Footer";
import { SettingsForm } from "./SettingsForm";
import Card from "./components/Card";
import { Text } from "react-native";

export const Settings = () => {
  return (
    <>
      <Text>Settings</Text>
      <Card>
        <SettingsForm />
      </Card>
      <Footer />
    </>
  );
};
