import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import Button from "~/components/Button";
import ButtonBack from "~/components/ButtonBack";
import Input from "~/components/Input";
import Notification from "~/components/Notification";
import DefaultLayout from "~/layouts/Default";
import useAuthentication from "~/hooks/useAuthentication";

import secureIcon from "~/assets/secure.png";
import userIcon from "~/assets/user.png";

const Authentication = () => {
  const {
    state: authState,
    dispatch: authDispatch,
    types,
  } = useAuthentication();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    authDispatch({ type: types.CLEAR_ERROR });
  }, [username, password]);

  const validations = [
    {
      value: username,
      setValue: setUsername,
      options: {
        name: "Username",
        icon: userIcon,
        inputProps: {
          autoCompleteType: "username",
        },
      },
    },
    {
      value: password,
      setValue: setPassword,
      options: {
        name: "Password",
        icon: secureIcon,
        inputProps: {
          secureTextEntry: true,
          autoCompleteType: "password",
        },
      },
    },
  ];

  return (
    <DefaultLayout header={<ButtonBack />}>
      <View style={styles.signInNotification}>
        {!!authState.error && (
          <Notification type="ERROR" message={authState.error} />
        )}
      </View>
      {validations.map((item) => (
        <View key={item.options.name} style={styles.signInInput}>
          <Input
            options={item.options}
            input={item.value}
            setInput={item.setValue}
          />
        </View>
      ))}

      <View style={styles.signInButton}>
        <Button
          label="Sign In"
          onPress={() =>
            authDispatch({
              type: types.SIGN_IN,
              payload: { username, password },
            })
          }
          type="PRIMARY"
        />
      </View>
      <Button
        label="Sign Up"
        onPress={() =>
          authDispatch({
            type: types.SIGN_UP,
            payload: { username, password },
          })
        }
        type="SECONDARY"
      />
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  signInButton: {
    marginBottom: 20,
  },
  signInInput: {
    marginBottom: 25,
  },
  signInNotification: {
    marginBottom: 20,
  },
});

export default Authentication;
