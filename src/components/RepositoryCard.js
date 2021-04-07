import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, Image, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import ButtonBookmark from "~/components/ButtonBookmark";
import routes from "~/config/routes";
import theme from "~/config/theme";
import { generateRepositoryKey } from "~/utils/keys";

const RepositoryCard = ({
  description = "",
  image = "",
  name = "",
  onBookmarkChange = () => {},
  owner = "",
  repo = "",
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.repositoryCard}
      onPress={() =>
        navigation.navigate(routes.REPOSITORY, {
          owner,
          repo,
        })
      }
    >
      <View style={styles.repositoryCardText}>
        <View style={styles.repositoryCardTextTitle}>
          <Image
            style={styles.repositoryCardTextTitleImage}
            source={{ uri: image }}
          />
          <Text style={styles.repositoryCardTextTitleName}>{name}</Text>
        </View>

        <Text style={styles.repositoryCardTextDescription}>{description}</Text>
      </View>

      <ButtonBookmark
        id={generateRepositoryKey(owner, repo)}
        onChange={onBookmarkChange}
        value={{
          description,
          image,
          name,
          owner,
          repo,
        }}
      />
    </TouchableOpacity>
  );
};

RepositoryCard.propTypes = {
  description: PropTypes.string,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onBookmarkChange: PropTypes.func,
  owner: PropTypes.string.isRequired,
  repo: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  repositoryCard: {
    alignItems: "center",
    backgroundColor: theme.colors.defaultLight,
    flexDirection: "row",
    paddingLeft: 15,
    paddingRight: 5,
    paddingVertical: 15,
  },
  repositoryCardText: {
    flex: 1,
  },
  repositoryCardTextDescription: {
    color: `${theme.colors.defaultDark}a0`,
    flexWrap: "wrap",
  },
  repositoryCardTextTitle: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 5,
  },
  repositoryCardTextTitleImage: {
    borderRadius: 15,
    height: 25,
    marginRight: 15,
    width: 25,
  },
  repositoryCardTextTitleName: {
    flexShrink: 1,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default RepositoryCard;
