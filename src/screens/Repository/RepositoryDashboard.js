import React from "react";
import PropTypes from "prop-types";
import { Image, StyleSheet, Text, View } from "react-native";

import ButtonBookmark from "~/components/ButtonBookmark";
import theme from "~/config/theme";
import useRepository from "~/hooks/useRepository";
import { generateRepositoryKey } from "~/utils/keys";

const RepositoryDashboard = ({ owner = "", repo = "" }) => {
  const { data } = useRepository(owner, repo);

  return (
    <View style={styles.repositoryDashboard}>
      <Image
        style={styles.repositoryDashboardOwnerImage}
        source={{ uri: data.image }}
      />

      <View style={styles.repositoryDashboardBookmark}>
        <ButtonBookmark
          id={generateRepositoryKey(owner, repo)}
          value={{
            description: data.description,
            image: data.image,
            name: data.name,
            owner,
            repo,
          }}
        />
      </View>

      <View style={styles.repositoryDashboardText}>
        <Text
          accessible={true}
          numberOfLines={2}
          style={styles.repositoryDashboardTextName}
        >
          {data.name}
        </Text>
        <Text
          accessible={true}
          numberOfLines={6}
          style={styles.repositoryDashboardTextDescription}
        >
          {data.description}
        </Text>
      </View>
    </View>
  );
};

RepositoryDashboard.propTypes = {
  owner: PropTypes.string.isRequired,
  repo: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  repositoryDashboard: {
    alignItems: "center",
    borderColor: theme.colors.brandSecondary,
    borderRadius: 20,
    borderWidth: 2,
    maxHeight: "40%",
    padding: 20,
  },
  repositoryDashboardBookmark: {
    position: "absolute",
    right: 20,
    top: 15,
  },
  repositoryDashboardOwnerImage: {
    borderRadius: 40,
    height: 70,
    marginBottom: 20,
    width: 70,
  },
  repositoryDashboardText: {
    alignSelf: "flex-start",
  },
  repositoryDashboardTextDescription: {
    color: theme.colors.defaultDark,
    fontSize: 14,
  },
  repositoryDashboardTextName: {
    color: theme.colors.defaultDark,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default RepositoryDashboard;
