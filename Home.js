import React, { useState, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  Platform,
  View,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { useDispatch, useSelector } from "react-redux";
import { Surface, Title, Button } from "react-native-paper";

import { setLastTimeCalledMom, addToCallHistoryAction } from "./momSlice";
import {
  selectFrequencyToCallMomInDays,
  selectLastCalledTime,
  selectPhoneNumber,
} from "./selectors";
import { call } from "./call";
import moment from "moment";
import { Footer } from "./Footer";
import { boxShadow, colors, cornerRadius, header, button } from "./Styles";

export const Home = () => {
  const dispatch = useDispatch();
  // const [token, setToken] = useState();
  const lastCalledTimeDate = useSelector(selectLastCalledTime);
  const setLastCalledTime = (time) => dispatch(setLastTimeCalledMom(time));
  const addToCallHistory = (time) => dispatch(addToCallHistoryAction(time));
  const phoneNumber = useSelector(selectPhoneNumber);
  const frequencyToCallMomInDays = useSelector(selectFrequencyToCallMomInDays);

  const trackCallingMom = () => {
    const currentTime = new Date().toString();
    setLastCalledTime(currentTime);
    addToCallHistory(currentTime);
  };

  const callAndTrack = () => {
    call(phoneNumber);
    trackCallingMom();
  };

  const lastCalledTime = lastCalledTimeDate && moment(lastCalledTimeDate);
  const daysSinceLastCalled = moment().diff(lastCalledTime, "days");
  const isUpcomingCall = daysSinceLastCalled <= frequencyToCallMomInDays;
  const isOutstandingCall = !isUpcomingCall;
  const outstandingDaysSinceCalling =
    daysSinceLastCalled - frequencyToCallMomInDays;

  let whenShouldYouCallYourMom;
  const daysUntilCall = frequencyToCallMomInDays - daysSinceLastCalled;

  if (isUpcomingCall && daysUntilCall === 0) {
    whenShouldYouCallYourMom = "today";
  } else if (isUpcomingCall && daysUntilCall === 1) {
    whenShouldYouCallYourMom = "1 day";
  } else if (isUpcomingCall) {
    whenShouldYouCallYourMom = daysUntilCall + " days";
  } else if (isOutstandingCall && outstandingDaysSinceCalling === 1) {
    whenShouldYouCallYourMom = "1 day";
  } else if (isOutstandingCall) {
    whenShouldYouCallYourMom = outstandingDaysSinceCalling + " days";
  }

  const youLastCalledYourMom = () => {
    return (
      lastCalledTime &&
      "You last called your mom " + moment(lastCalledTime).fromNow()
    );
  };
  // const sendNotification = ({ token }) => {
  //   fetch("https://exp.host/--/api/v2/push/send", {
  //     method: "POST",
  //     headers: {
  //       host: "exp.host",
  //       accept: "application/json",
  //       "accept-encoding": "gzip, deflate",
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       to: token,
  //       title: "From App",
  //       body: "World",
  //     }),
  //   });
  // };
  // const registerForPushNotificationsAsync = async () => {
  //   if (Constants.isDevice) {
  //     const { status: existingStatus } =
  //       await Notifications.getPermissionsAsync();
  //     let finalStatus = existingStatus;
  //     if (existingStatus !== "granted") {
  //       const { status } = await Notifications.requestPermissionsAsync();
  //       finalStatus = status;
  //     }
  //     if (finalStatus !== "granted") {
  //       alert("Failed to get push token for push notification!");
  //       return;
  //     }
  //     const token = (await Notifications.getExpoPushTokenAsync()).data;
  //     setToken(token);
  //   } else {
  //     alert("Must use physical device for Push Notifications");
  //   }

  //   if (Platform.OS === "android") {
  //     Notifications.setNotificationChannelAsync("default", {
  //       name: "default",
  //       importance: Notifications.AndroidImportance.MAX,
  //       vibrationPattern: [0, 250, 250, 250],
  //       lightColor: "#FF231F7C",
  //     });
  //   }
  // };

  // useEffect(() => {
  //   if (token) {
  //     sendNotification({ token });
  //   }
  // }, [token]);

  // useEffect(() => {
  //   registerForPushNotificationsAsync();
  // }, []);
  return (
    <View
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <View style={{ flex: 1 }}>
        <Image
          style={{ width: "100%", height: "60%" }}
          source={require("./assets/PlaceholderMom.png")}
        />
        <Surface
          style={{
            elevation: 4,
            width: "100%",
            position: "absolute",
            bottom: 0,
            height: "50%",
            backgroundColor: colors.white,
            flex: 1,
            padding: 20,
            borderTopLeftRadius: cornerRadius,
            borderTopRightRadius: cornerRadius,
            alignItems: "center",
          }}
        >
          <Text style={{ width: "60%", textAlign: "center" }}>
            {youLastCalledYourMom()}
          </Text>
          <TouchableWithoutFeedback
            onPress={() =>
              setLastCalledTime(
                moment().subtract(7, "days").toDate().toString()
              )
            }
          >
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Image source={require("./assets/Calendar.png")} />
              <View
                style={{
                  position: "absolute",
                  justifyContent: "center",
                  alignItems: "center",
                  top: "40%",
                }}
              >
                {isUpcomingCall ? (
                  <Text>Upcoming Call</Text>
                ) : (
                  <Text style={{ color: "red" }}>Outstanding Call</Text>
                )}
                <Title>{whenShouldYouCallYourMom}</Title>
              </View>
            </View>
          </TouchableWithoutFeedback>

          <Button
            style={{
              ...button,
              margin: 20,
              width: "60%",
              height: 50,
            }}
            mode={"contained"}
            icon={"phone"}
            onPress={() => callAndTrack()}
            title={"Call Mom"}
          >
            Call Mom
          </Button>
        </Surface>
      </View>

      <Footer />
    </View>
  );
};
