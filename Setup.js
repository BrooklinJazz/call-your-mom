import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNavigation } from "./momSlice";
import { Routes } from "./Routes";
import { selectPhoneNumber } from "./selectors";
import { SettingsForm } from "./SettingsForm";

export const Setup = () => {
  const phoneNumber = useSelector(selectPhoneNumber);
  const dispatch = useDispatch();
  // fixing a bug using || "Home" because of a require cycle. need a better fix
  const goHome = () => dispatch(setNavigation(Routes.Home || "Home"));
  useEffect(() => {
    if (phoneNumber) {
      goHome();
    }
  }, []);
  return <SettingsForm />;
};
