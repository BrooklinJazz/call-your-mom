import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  Platform,
  View,
  Image,
  TouchableWithoutFeedback,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { Surface, Title, Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

import { setLastTimeCalledMom, addToCallHistoryAction } from "./momSlice";
import {
  selectFrequencyToCallMomInDays,
  selectLastCalledTime,
  selectPhoneNumber,
} from "./selectors";
import { call } from "./call";
import moment from "moment";
import { Footer } from "./Footer";
import { colors, cornerRadius, button } from "./Styles";

export const Home = () => {
  const dispatch = useDispatch();
  const lastCalledTimeDate = useSelector(selectLastCalledTime);
  const setLastCalledTime = (time) => dispatch(setLastTimeCalledMom(time));
  const addToCallHistory = (time) => dispatch(addToCallHistoryAction(time));
  const phoneNumber = useSelector(selectPhoneNumber);
  const frequencyToCallMomInDays = useSelector(selectFrequencyToCallMomInDays);
  const [image, setImage] = useState(null);

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
  const daysSinceLastCalled = lastCalledTime
    ? moment().diff(lastCalledTime, "days")
    : frequencyToCallMomInDays; // set to frequencyToCallMomInDays to trigger "today" call case

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

  const openPhotoUpload = async () => {
    await requestUploadPermissions();

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const renderMomPhoto = () => {
    if (image) {
      return { uri: image };
    }

    return require("./assets/PlaceholderMom.png");
  };

  const requestUploadPermissions = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

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
          source={renderMomPhoto()}
        />
        <TouchableOpacity
          onPress={() => openPhotoUpload()}
          style={{
            width: 60,
            height: 60,
            position: "absolute",
            top: 330,
            left: 300,
            elevation: 20,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={{
              height: "90%",
              width: "90%",
              borderRadius: 50,
            }}
            source={require("./assets/editCircle.png")}
          />
        </TouchableOpacity>
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
            justifyContent: "space-between",
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
