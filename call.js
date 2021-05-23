import { Linking } from "react-native";


export const call = (phoneNumber) => Linking.openURL(`tel:${phoneNumber}`);
