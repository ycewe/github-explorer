import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

import ButtonIcon from "./ButtonIcon";
import ModalView from "./ModalView";
import theme from "~/config/theme";

import tickIcon from "~/assets/tick.png";

const Select = ({
  icon = 0,
  initialOption = "",
  onChange = () => {},
  options = [], // { name: "", value: "" }
  style = {},
  title = "",
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    initialOption || ((options[0] ?? {}).value ?? ""),
  );

  useEffect(() => {
    onChange(selectedOption);
  }, [selectedOption]);

  return (
    <>
      <ButtonIcon
        image={icon}
        onPress={() => setShowOptions(true)}
        style={{ ...styles.selectButton, ...style }}
      />

      <ModalView
        animationType="SLIDE"
        isVisible={showOptions}
        onClose={() => setShowOptions(false)}
      >
        <Text style={styles.selectTitle}>{title}</Text>

        {options.map((option) => (
          <TouchableOpacity
            style={styles.selectOption}
            activeOpacity={0.8}
            key={option.value}
            onPress={() => setSelectedOption(option.value)}
          >
            <Text
              style={[
                styles.selectOptionText,
                selectedOption == option.value && styles.selectOptionTextActive,
              ]}
            >
              {option.name}
            </Text>

            {selectedOption == option.value && (
              <Image style={styles.selectOptionIcon} source={tickIcon} />
            )}
          </TouchableOpacity>
        ))}
      </ModalView>
    </>
  );
};

Select.propTypes = {
  icon: PropTypes.number.isRequired,
  initialOption: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  style: PropTypes.object,
  title: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  selectButton: {
    alignSelf: "center",
    backgroundColor: theme.colors.brandPrimary,
    borderRadius: 5,
    height: 45,
    marginLeft: 10,
    padding: 5,
    width: 45,
  },
  selectOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  selectOptionIcon: {
    height: 20,
    width: 26.6,
  },
  selectOptionText: {
    color: theme.colors.brandPrimary,
    fontSize: 16,
    fontWeight: "bold",
  },
  selectOptionTextActive: {
    color: theme.colors.brandSecondary,
  },
  selectTitle: {
    borderBottomColor: theme.colors.brandPrimary,
    borderBottomWidth: 2,
    color: theme.colors.brandPrimary,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    paddingBottom: 10,
    textTransform: "uppercase",
  },
});

export default Select;
