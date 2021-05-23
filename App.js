import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { CallYourMom } from "./CallYourMom";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { SafeAreaProvider } from "react-native-safe-area-context";
export default function App() {
  const [fontsLoaded] = useFonts({ Poppins_400Regular, Poppins_700Bold });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <SafeAreaProvider>
        <Provider store={store}>
          <CallYourMom />
        </Provider>
      </SafeAreaProvider>
    );
  }
}
