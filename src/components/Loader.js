import React from "react";
import { ActivityIndicator } from "react-native";

import theme from "~/config/theme";

const Loader = () => {
  return <ActivityIndicator size="large" color={theme.colors.brandPrimary} />;
};

export default Loader;
