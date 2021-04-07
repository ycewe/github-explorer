import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View } from "react-native";

import theme from "~/config/theme";

const Notification = ({ message = "", type = "ERROR" }) => {
  const modifiers = {
    // first element: container
    // second element: text
    ERROR: [styles.notificationError, styles.notificationErrorText],
    SUCCESS: [styles.notificationSuccess, styles.notificationSuccessText],
  };

  return (
    <View style={[styles.notification, modifiers[type][0]]}>
      <Text style={[styles.notificationText, modifiers[type][1]]}>
        {message}
      </Text>
    </View>
  );
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["ERROR", "SUCCESS"]),
};

const styles = StyleSheet.create({
  notification: {
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
  },
  notificationError: {
    backgroundColor: theme.colors.errorLight,
    borderColor: theme.colors.error,
  },
  notificationErrorText: {
    color: theme.colors.error,
  },
  notificationSuccess: {
    backgroundColor: theme.colors.successLight,
    borderColor: theme.colors.success,
  },
  notificationSuccessText: {
    color: theme.colors.success,
  },
  notificationText: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default Notification;
