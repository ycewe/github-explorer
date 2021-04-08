import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, Image, StyleSheet } from "react-native";

const ButtonIcon = ({
  image = 0,
  label = "Press button icon",
  onPress = () => {},
  style = {},
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
    >
      <Image style={styles.buttonIcon} source={image} />
    </TouchableOpacity>
  );
};

ButtonIcon.propTypes = {
  image: PropTypes.number.isRequired,
  label: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.object,
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderRadius: 30,
    height: 50,
    justifyContent: "center",
    marginLeft: 5,
    width: 50,
  },
  buttonIcon: {
    height: "80%",
    width: "80%",
  },
});

export default ButtonIcon;
