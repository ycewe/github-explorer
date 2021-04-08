import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { StyleSheet, TextInput, Image, View } from "react-native";

import theme from "~/config/theme";

import searchIcon from "~/assets/search.png";

const Search = ({ search = () => {} }) => {
  const [input, setInput] = useState("");

  useEffect(() => {
    search(input);
  }, [input, search]);

  return (
    <View style={styles.search}>
      <Image style={styles.searchIcon} source={searchIcon} />
      <TextInput
        accessibilityRole="search"
        style={styles.searchInput}
        placeholder="Type to search repositories"
        placeholderTextColor={theme.colors.brandSecondary}
        value={input}
        onChangeText={setInput}
      />
    </View>
  );
};

Search.propTypes = {
  search: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  search: {
    alignItems: "center",
    backgroundColor: theme.colors.defaultLight,
    borderRadius: 10,
    flex: 1,
    flexDirection: "row",
    height: 45,
    maxHeight: 45,
  },
  searchIcon: {
    height: 20,
    marginHorizontal: 15,
    width: 20,
  },
  searchInput: {
    width: "100%",
  },
});

export default Search;
