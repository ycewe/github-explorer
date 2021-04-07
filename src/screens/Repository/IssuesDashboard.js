import React from "react";
import PropTypes from "prop-types";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/core";

import IssueUser from "./IssueUser";
import ButtonIcon from "~/components/ButtonIcon";
import Loader from "~/components/Loader";
import EmptyList from "~/components/EmptyList";
import routes from "~/config/routes";
import theme from "~/config/theme";
import useIssues from "~/hooks/useIssues";

import addIcon from "~/assets/add.png";

const IssuesDashboard = ({ owner = "", repo = "" }) => {
  const { data, isLoading } = useIssues(owner, repo);
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.issuesDashboardHeader}>
        <Text style={styles.issuesDashboardHeaderTitle}>Issues</Text>
        <ButtonIcon
          image={addIcon}
          onPress={() =>
            navigation.navigate(routes.ISSUE_CREATE, {
              owner,
              repo,
            })
          }
          style={styles.issuesDashboardHeaderButton}
        />
      </View>

      <View style={styles.issuesDashboardResults}>
        {isLoading ? (
          <Loader />
        ) : (
          <FlatList
            data={data.slice(0, 5)}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <IssueUser issue={item} />}
            ListEmptyComponent={<EmptyList text="No issues found" />}
          />
        )}
      </View>
    </>
  );
};

IssuesDashboard.propTypes = {
  owner: PropTypes.string.isRequired,
  repo: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  issuesDashboardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  issuesDashboardHeaderButton: {
    backgroundColor: theme.colors.brandPrimary,
    borderRadius: 5,
    height: 30,
    marginRight: 5,
    width: 30,
  },
  issuesDashboardHeaderTitle: {
    color: theme.colors.appPrimary,
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 5,
    marginRight: 15,
    textDecorationLine: "underline",
  },
  issuesDashboardResults: {
    height: 300,
    marginTop: 10,
  },
});

export default IssuesDashboard;
