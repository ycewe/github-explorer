import React from "react";
import PropTypes from "prop-types";
import { Image, StyleSheet, View } from "react-native";

import explorerIcon from "~/assets/explorer.png";

const DefaultLayout = ({ children, header }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>{header}</View>
      <Image style={styles.logo} source={explorerIcon}></Image>
      <View style={styles.content}>{children}</View>
    </View>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
  header: PropTypes.element,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
  content: {
    flex: 0.9,
    marginTop: 20,
    width: "100%",
  },
  header: {
    justifyContent: "center",
    marginBottom: 30,
  },
  logo: {
    alignSelf: "center",
    height: 100,
    marginBottom: 20,
    width: 200,
  },
});

export default DefaultLayout;
