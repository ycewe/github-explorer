import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";

import IssueCard from "~/components/IssueCard";
import useUser from "~/hooks/useUser";

/**
 * @props
 * issue = {
 *  dateCreated = "",
 *  image = "",
 *  name = "",
 *  owner = ""
 * }
 */

const IssueUser = ({ issue = {} }) => {
  const { data } = useUser(issue.owner);

  return (
    <View style={styles.issuesDashboardResultsItem}>
      <IssueCard
        dateCreated={issue.dateCreated}
        image={issue.image}
        name={issue.name}
        owner={issue.owner}
        ownerFullName={data.fullName}
        ownerLocation={data.location}
      />
    </View>
  );
};

IssueUser.propTypes = {
  issue: PropTypes.shape({
    dateCreated: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    ownerFullName: PropTypes.string.isRequired,
    ownerLocation: PropTypes.string.isRequired,
  }),
};

const styles = StyleSheet.create({
  issuesDashboardResultsItem: {
    marginBottom: 15,
    marginHorizontal: 5,
  },
});

export default IssueUser;
