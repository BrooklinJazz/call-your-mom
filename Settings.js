import React, { useEffect, useState } from "react";
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
  const setPhoneNumber = (num) => num && dispatch(setMomsPhoneNumber(num));
  const [tempPhoneNumber, setTempPhoneNumber] = useState(phoneNumber);

  // it's loading with undefined initial tempPhoneNumber
  // this fixes the bug
  useEffect(() => {
    setTempPhoneNumber(phoneNumber);
  }, [phoneNumber]);
  return (
    <>
      <Wrapper>
        <Text style={{ ...header, paddingBottom: 0 }}>
          Set up mom's information
        </Text>
        <Card height={"90%"}>
          <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
            <SettingsForm
              onBlurPhoneNumber={() => {
                console.warn(tempPhoneNumber);
                if (tempPhoneNumber) {
                  setPhoneNumber(tempPhoneNumber);
                } else {
                  setTempPhoneNumber(phoneNumber);
                }
              }}
              tempPhoneNumber={tempPhoneNumber}
              setTempPhoneNumber={setTempPhoneNumber}
            />
          </View>
        </Card>
      </Wrapper>
      <Footer />
    </>
  );
};
