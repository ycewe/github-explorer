import React, { useState } from "react";
import PropTypes from "prop-types";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import ModalView from "./ModalView";
import theme from "~/config/theme";

const IssueCard = ({
  dateCreated = "",
  image = "",
  name = "",
  owner = "",
  ownerFullName = "",
  ownerLocation = "",
}) => {
  const [showUser, setShowUser] = useState(false);

  return (
    <View style={styles.issueCard}>
      <TouchableOpacity
        style={styles.issueCardOwner}
        onPress={() => setShowUser(true)}
      >
        <Text style={styles.issueCardCardOwnerName}>{owner}</Text>
      </TouchableOpacity>

      <View style={styles.issueCardInfo} accessible={true}>
        <ModalView isVisible={showUser} onClose={() => setShowUser(false)}>
          <View style={styles.issueCardInfoOwner} accessible={true}>
            <Text style={styles.issueCardInfoText} numberOfLines={1}>
              {ownerFullName}
            </Text>

            <Image
              style={styles.issueCardInfoOwnerImage}
              source={{ uri: image }}
            />

            <View style={styles.issueCardInfoLocation}>
              <Text style={styles.issueCardInfoSubText} numberOfLines={1}>
                Location:{" "}
              </Text>
              <Text style={styles.issueCardInfoText} numberOfLines={1}>
                {ownerLocation || "-"}
              </Text>
            </View>
          </View>
        </ModalView>

        <Text style={styles.issueCardInfoText} numberOfLines={2}>
          {name}
        </Text>
        <Text style={styles.issueCardInfoDate} numberOfLines={1}>
          Created at {dateCreated}
        </Text>
      </View>
    </View>
  );
};

IssueCard.propTypes = {
  dateCreated: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  ownerFullName: PropTypes.string,
  ownerLocation: PropTypes.string,
};

const styles = StyleSheet.create({
  issueCard: {
    backgroundColor: theme.colors.defaultLight,
  },
  issueCardCardOwnerName: {
    color: theme.colors.appPrimary,
    fontSize: 16,
    fontWeight: "bold",
    paddingBottom: 5,
  },
  issueCardInfo: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  issueCardInfoDate: {
    alignSelf: "flex-end",
    color: theme.colors.brandPrimary,
    fontSize: 12,
    marginTop: 5,
  },
  issueCardInfoLocation: {
    flexDirection: "row",
  },
  issueCardInfoOwner: {
    alignItems: "center",
    justifyContent: "center",
  },
  issueCardInfoOwnerImage: {
    borderRadius: 50,
    height: 80,
    marginVertical: 15,
    width: 80,
  },
  issueCardInfoSubText: {
    color: theme.colors.appPrimary,
  },
  issueCardInfoText: {
    color: theme.colors.appPrimary,
    fontWeight: "bold",
  },
  issueCardOwner: {
    backgroundColor: theme.colors.appSecondary,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
});

export default IssueCard;
