import React, { useState, useCallback } from "react";
import debounce from "lodash/debounce";
import { FlatList, StyleSheet, View } from "react-native";

import Loader from "~/components/Loader";
import RepositoryCard from "~/components/RepositoryCard";
import Search from "~/components/Search";
import EmptyList from "~/components/EmptyList";
import useSearchRepositories from "~/hooks/useSearchRepositories";
import theme from "~/config/theme";

const renderItem = ({ item }) => {
  return (
    <View style={styles.searchRepositoriesResultsItem}>
      <RepositoryCard
        description={item.description}
        image={item.image}
        name={item.name}
        owner={item.owner}
        repo={item.repo}
        url={item.url}
      />
    </View>
  );
};

const SearchRepositories = () => {
  const [query, setQuery] = useState("");
  const { data, isLoading } = useSearchRepositories(query);

  const debouncedSearch = useCallback(
    debounce((query) => setQuery(query), 100),
    [],
  );

  return (
    <View style={styles.searchRepositories}>
      <Search search={debouncedSearch} />

      <View style={styles.searchRepositoriesResults}>
        {isLoading ? (
          <Loader />
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            ListEmptyComponent={<EmptyList />}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchRepositories: {
    borderRadius: 10,
    flexGrow: 1,
    height: "auto",
    padding: 10,
  },
  searchRepositoriesResults: {
    flex: 1,
    marginTop: 20,
  },
  searchRepositoriesResultsItem: {
    borderBottomColor: theme.colors.appBackground,
    borderBottomWidth: 1,
  },
});

export default SearchRepositories;
