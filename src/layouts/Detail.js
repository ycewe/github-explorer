import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View } from "react-native";

import ButtonBack from "~/components/ButtonBack";

const DetailLayout = ({ children, title = "" }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ButtonBack />
        <Text accessible={true} style={styles.headerTitle}>
          {title}
        </Text>
      </View>

      {children}
    </View>
  );
};

DetailLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    paddingVertical: 20,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 20,
    marginLeft: -5,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default DetailLayout;
