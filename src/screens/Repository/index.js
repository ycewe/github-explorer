import React from "react";
import { StyleSheet, View } from "react-native";
import { useRoute } from "@react-navigation/native";

import IssuesDashboard from "./IssuesDashboard";
import RepositoryDashboard from "./RepositoryDashboard";
import DetailLayout from "~/layouts/Detail";

const Repository = () => {
  const { params = {} } = useRoute();

  return (
    <DetailLayout title="Repository">
      <RepositoryDashboard owner={params.owner} repo={params.repo} />

      <View style={styles.repositoryIssues}>
        <IssuesDashboard owner={params.owner} repo={params.repo} />
      </View>
    </DetailLayout>
  );
};

const styles = StyleSheet.create({
  repositoryIssues: {
    marginTop: 30,
    paddingHorizontal: 10,
  },
});

export default Repository;
