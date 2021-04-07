import React from "react";
import PropTypes from "prop-types";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";

import theme from "~/config/theme";

const Input = ({
  input = "",
  setInput = () => {},
  options = {
    name: "",
    icon: 0,
    inputProps: {},
  },
}) => {
  return (
    <View style={styles.input}>
      <Text style={styles.inputName}>{options.name}</Text>
      <View style={styles.inputBody}>
        {options.icon && (
          <Image style={styles.inputBodyIcon} source={options.icon} />
        )}
        <TextInput
          style={styles.inputBodyTextbox}
          value={input}
          onChangeText={setInput}
          {...options.inputProps}
        />
      </View>
    </View>
  );
};

Input.propTypes = {
  input: PropTypes.string.isRequired,
  setInput: PropTypes.func.isRequired,
  options: PropTypes.shape({
    name: PropTypes.string,
    icon: PropTypes.number,
    inputProps: PropTypes.object,
  }),
};

const styles = StyleSheet.create({
  input: {
    maxHeight: 120,
  },
  inputBody: {
    backgroundColor: theme.colors.defaultLight,
    borderRadius: 20,
    flexDirection: "row",
    paddingHorizontal: 15,
  },
  inputBodyIcon: {
    height: 19.5,
    marginHorizontal: 5,
    marginTop: 10,
    width: 15,
  },
  inputBodyTextbox: {
    fontSize: 18,
    marginVertical: 5,
    paddingHorizontal: 10,
    textAlignVertical: "top",
    width: "100%",
  },
  inputName: {
    color: theme.colors.brandPrimary,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    marginLeft: 15,
  },
});

export default Input;
