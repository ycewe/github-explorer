import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/core";

import Button from "~/components/Button";
import theme from "~/config/theme";

const EmptyList = ({ text = "No results found", buttonOptions = {} }) => {
  const navigation = useNavigation();

  return (
    <>
      <Text style={styles.emptyListText}>{text}</Text>
      {buttonOptions.text && (
        <Button
          accessibilityHint={`Navigates to ${buttonOptions.route}`}
          accessibilityRole="link"
          label={buttonOptions.text}
          onPress={() => navigation.push(buttonOptions.route)}
          style={styles.emptyListButton}
          type="PRIMARY"
        />
      )}
    </>
  );
};

EmptyList.propTypes = {
  text: PropTypes.string,
  buttonOptions: PropTypes.shape({
    text: PropTypes.string,
    route: PropTypes.string,
  }),
};

const styles = StyleSheet.create({
  emptyListButton: {
    alignSelf: "center",
    height: 40,
    width: "70%",
  },
  emptyListText: {
    color: theme.colors.appPrimary,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
});

export default EmptyList;
