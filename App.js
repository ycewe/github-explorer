import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import { QueryClient, QueryClientProvider } from "react-query";

import Router from "./src/Router";
import theme from "./src/config/theme";
import { AuthenticationProvider } from "~/hooks/useAuthentication";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <View style={styles.app}>
        <AuthenticationProvider>
          <StatusBar style="auto" />
          <Router />
        </AuthenticationProvider>
      </View>
    </QueryClientProvider>
  );
};

const styles = StyleSheet.create({
  app: {
    backgroundColor: theme.colors.background,
    flex: 1,
    paddingBottom: 30,
    paddingHorizontal: 30,
    paddingTop: 55,
  },
});

export default App;
