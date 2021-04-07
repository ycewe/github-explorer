import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Home from "~/screens/Home";
import Authentication from "./screens/Authentication";
import Repository from "./screens/Repository";
import IssueCreate from "./screens/IssueCreate";
import routes from "~/config/routes";
import theme from "~/config/theme";
import { AUTHENTICATION_KEY } from "~/config/keys";
import useAuthentication from "~/hooks/useAuthentication";
import AsyncStorage from "~/services/asyncStorage";

const Root = createStackNavigator();

const Router = () => {
  const { state, dispatch, types } = useAuthentication();

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = await AsyncStorage.get(AUTHENTICATION_KEY);

      if (token) {
        dispatch({ type: types.SIGN_IN, payload: { token } });
      }
    };

    checkAuthentication();
  }, []);

  return (
    <NavigationContainer theme={theme}>
      <Root.Navigator
        initialRouteName={routes.HOME}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Root.Screen name={routes.HOME} component={Home} />
        <Root.Screen name={routes.REPOSITORY} component={Repository} />
        <Root.Screen name={routes.ISSUE_CREATE} component={IssueCreate} />

        {!state.token && (
          <Root.Screen name={routes.SIGN_IN} component={Authentication} />
        )}
      </Root.Navigator>
    </NavigationContainer>
  );
};

export default Router;
