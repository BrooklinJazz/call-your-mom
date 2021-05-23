import moment from "moment";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { Surface, Title } from "react-native-paper";
import { useSelector } from "react-redux";
import { Footer } from "./Footer";
import { selectCallHistory } from "./selectors";
import { cornerRadius, header } from "./Styles";

export const CallHistory = () => {
  const callHistory = useSelector(selectCallHistory);
  return (
    <View style={{ width: "100%", height: "100%" }}>
      <View style={{ flex: 1, padding: "10%" }}>
        <Text style={header}>Call History</Text>
        <ScrollView>
          {callHistory.map((each, i) => (
            <Surface
              key={each + i}
              style={{
                backgroundColor: "white",
                marginBottom: 20,
                padding: 20,
                elevation: 4,
                borderRadius: cornerRadius,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                height: 70,
              }}
            >
              <Text style={{ fontWeight: "bold" }} key={i}>
                {moment(each).format("MMM D, YYYY")}
              </Text>
              <Text>{moment(each).format("ha")}</Text>
            </Surface>
          ))}
        </ScrollView>
      </View>
      <Footer />
    </View>
  );
};
