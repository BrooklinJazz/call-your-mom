import React from "react";
import { Footer } from "./Footer";
import { SettingsForm } from "./SettingsForm";
import Card from "./components/Card";
import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { selectPhoneNumber } from "./selectors";
import { setMomsPhoneNumber } from "./momSlice";
import { header } from "./Styles";
export const Settings = () => {
  const phoneNumber = useSelector(selectPhoneNumber);
  const dispatch = useDispatch();
  const setPhoneNumber = (num) => dispatch(setMomsPhoneNumber(num));
  return (
    <>
      <Wrapper>
        <Text style={header}>Set up mom's information</Text>
        <Card>
          <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
            <SettingsForm
              tempPhoneNumber={phoneNumber}
              setTempPhoneNumber={setPhoneNumber}
            />
          </View>
        </Card>
      </Wrapper>
      <Footer />
    </>
  );
};
