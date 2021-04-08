import React from "react";
import PropTypes from "prop-types";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

import theme from "~/config/theme";

const Button = ({
  label = "",
  onPress = () => {},
  style = {},
  type = "PRIMARY",
}) => {
  const modifier = {
    // first element: container
    // second element: text
    PRIMARY: [styles.buttonPrimary, styles.buttonPrimaryText],
    SECONDARY: [styles.buttonSecondary, styles.buttonSecondaryText],
  };

  return (
    <TouchableOpacity
      style={[styles.button, style, modifier[type][0]]}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, modifier[type][1]]}>{label}</Text>
    </TouchableOpacity>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.object,
  type: PropTypes.oneOf(["PRIMARY", "SECONDARY"]),
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    height: 50,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  buttonPrimary: {
    backgroundColor: theme.colors.appPrimary,
  },
  buttonPrimaryText: {
    color: theme.colors.defaultLight,
  },
  buttonSecondary: {
    backgroundColor: theme.colors.defaultLight,
    borderColor: theme.colors.appPrimary,
    borderWidth: 1,
  },
  buttonSecondaryText: {
    color: theme.colors.appPrimary,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Button;
