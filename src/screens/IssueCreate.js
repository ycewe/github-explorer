import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useRoute } from "@react-navigation/native";

import Button from "~/components/Button";
import Input from "~/components/Input";
import Loader from "~/components/Loader";
import Notification from "~/components/Notification";
import DetailLayout from "~/layouts/Detail";
import useCreateIssue from "~/hooks/useCreateIssue";

const IssueCreate = () => {
  const { params = {} } = useRoute();
  const { mutate, isSuccess, isLoading, isError } = useCreateIssue(
    params.owner,
    params.repo,
  );

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const validations = [
    {
      value: title,
      setValue: setTitle,
      options: {
        name: "Title",
      },
    },
    {
      value: body,
      setValue: setBody,
      options: {
        name: "Description",
        inputProps: {
          multiline: true,
          numberOfLines: 5,
        },
      },
    },
  ];

  const createIssue = () => {
    mutate({ title, body });

    setTitle("");
    setBody("");
  };

  return (
    <DetailLayout title="Create Issue">
      <View style={styles.issueCreateNotification}>
        {isSuccess && (
          <Notification
            type="SUCCESS"
            message={"Issue has been successfully created!"}
          />
        )}
        {isError && (
          <Notification
            type="ERROR"
            message={
              "Something went wrong. Please try again or check if you are authorized for this action."
            }
          />
        )}
        {isLoading && <Loader />}
      </View>

      {validations.map((item) => (
        <View key={item.options.name} style={styles.issueCreateInput}>
          <Input
            options={item.options}
            input={item.value}
            setInput={item.setValue}
          />
        </View>
      ))}

      <View style={styles.issueCreateButton}>
        <Button label="Create" onPress={createIssue} type="PRIMARY" />
      </View>
    </DetailLayout>
  );
};

const styles = StyleSheet.create({
  issueCreateButton: {
    marginTop: 60,
  },
  issueCreateInput: {
    marginBottom: 20,
  },
  issueCreateNotification: {
    marginVertical: 20,
  },
});

export default IssueCreate;
