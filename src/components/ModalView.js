import React from "react";
import PropTypes from "prop-types";
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import theme from "~/config/theme";

const ModalView = ({
  children,
  animationType = "FADE",
  isVisible = false,
  onClose = () => {},
}) => {
  const modifier = {
    // first element: container style
    // second element: content style
    FADE: styles.modalViewContentFade,
    SLIDE: styles.modalViewContentSlide,
  };

  return (
    <Modal
      animationType={animationType.toLowerCase()}
      onRequestClose={onClose}
      transparent={true}
      visible={isVisible}
    >
      <TouchableOpacity
        style={styles.modalView}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableWithoutFeedback>
          <View style={[styles.modalViewContent, modifier[animationType]]}>
            {children}
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

ModalView.propTypes = {
  children: PropTypes.node,
  animationType: PropTypes.oneOf(["FADE", "SLIDE"]),
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  modalView: {
    alignItems: "center",
    backgroundColor: `${theme.colors.brandPrimary}90`,
    flexGrow: 1,
    justifyContent: "center",
  },
  modalViewContent: {
    backgroundColor: theme.colors.defaultLight,
    padding: 20,
  },
  modalViewContentFade: {
    borderRadius: 10,
    maxWidth: "80%",
  },
  modalViewContentSlide: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    bottom: 0,
    height: "40%",
    padding: 30,
    position: "absolute",
    width: "100%",
  },
});

export default ModalView;
