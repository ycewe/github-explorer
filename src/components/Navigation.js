import React, { useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Image, Text, TouchableOpacity, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import theme from "~/config/theme";

const Navigation = ({ links = [], subLink = {} }) => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState(links[0].route || "");

  // ensures that there is always an active tab
  // especially after sign out
  useEffect(() => {
    setActiveTab(links[0].route);
  }, [links]);

  const changeTab = useCallback(
    (tabName = "") => {
      if (activeTab === tabName) {
        // prevent unnecessary re-rendering and
        // flashing if tab already active
        return;
      }

      setActiveTab(tabName);
      navigation.push(tabName);
    },
    [activeTab],
  );

  const handleSubNavPress = useCallback(() => {
    if (subLink.onPress) {
      subLink.onPress();
    }

    navigation.push(subLink.route);
  }, [subLink]);

  return (
    <>
      <View style={styles.tabs} accessibilityRole="tablist">
        {links.map((link) => (
          <TouchableOpacity
            accessibilityRole="tab"
            activeOpacity={1}
            key={link.route}
            onPress={() => changeTab(link.route)}
            style={[
              styles.tabsTab,
              activeTab == link.route
                ? styles.tabsTabActive
                : styles.tabsTabInactive,
            ]}
          >
            <Image style={styles.tabsTabIcon} source={link.icon} />
          </TouchableOpacity>
        ))}

        {subLink && (
          <TouchableOpacity
            accessibilityRole="button"
            key={subLink.route}
            onPress={handleSubNavPress}
            style={[styles.tabsSubTab, styles.tabsTabInactive]}
          >
            <Text style={styles.tabsTabText}>{subLink.name}</Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

Navigation.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.number.isRequired,
      route: PropTypes.string.isRequired,
    }),
  ),
  subLink: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onPress: PropTypes.func,
    route: PropTypes.string.isRequired,
  }),
};

const styles = StyleSheet.create({
  tabs: {
    flexDirection: "row",
  },
  tabsSubTab: {
    marginLeft: "auto",
  },
  tabsTab: {
    marginBottom: 5,
    marginRight: 10,
    padding: 5,
  },
  tabsTabActive: {
    backgroundColor: theme.colors.appSecondary,
    // borderBottomColor: theme.colors.appSecondary,
    // borderBottomWidth: 4,
    borderRadius: 10,
  },
  tabsTabIcon: {
    height: 25,
    width: 25,
  },
  tabsTabText: {
    color: theme.colors.brandPrimary,
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default Navigation;
