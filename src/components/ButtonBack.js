import React from "react";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/core";

import ButtonIcon from "./ButtonIcon";
import arrowLeftIcon from "~/assets/arrowLeft.png";

const ButtonBack = () => {
  const navigation = useNavigation();

  return (
    <ButtonIcon
      image={arrowLeftIcon}
      onPress={() => navigation.goBack()}
      style={styles.buttonBack}
    />
  );
};

const styles = StyleSheet.create({
  buttonBack: {
    height: 30,
    width: 20,
  },
});

export default ButtonBack;
