import React, { useCallback, useEffect, useState } from "react";
import debounce from "lodash/debounce";
import { useFocusEffect } from "@react-navigation/native";
import { FlatList, StyleSheet, View } from "react-native";

import AsyncStorage from "~/services/asyncStorage";
import RepositoryCard from "~/components/RepositoryCard";
import Search from "~/components/Search";
import Select from "~/components/Select";
import EmptyList from "~/components/EmptyList";
import routes from "~/config/routes";
import theme from "~/config/theme";
import useAuthentication from "~/hooks/useAuthentication";
import { REPOSITORY_KEY } from "~/config/keys";

import sortIcon from "~/assets/sort.png";

const sortValues = {
  LEAST_RECENT: { name: "Least Recent", value: "createdAt_asc" },
  MOST_RECENT: { name: "Most Recent", value: "createdAt_desc" },
};

const renderItem = ({ item, onBookmarkChange }) => {
  return (
    <View style={styles.bookmarkedRepositoriesResultsItem}>
      <RepositoryCard
        description={item.description}
        image={item.image}
        name={item.name}
        onBookmarkChange={onBookmarkChange}
        owner={item.owner}
        repo={item.repo}
      />
    </View>
  );
};

const BookmarkedRepositories = () => {
  const [displayedRepositories, setDisplayedRepositories] = useState([]);
  const [repositories, setRepositories] = useState([]);
  const [sort, setSort] = useState(sortValues.MOST_RECENT.value);
  const [query, setQuery] = useState("");
  const { state: authState } = useAuthentication();

  useFocusEffect(
    useCallback(() => {
      const retrieveBookmarkedRepositories = async () => {
        const keys = await AsyncStorage.listKeys();
        const bookmarkKeys = (keys ?? []).filter((key) =>
          key.includes(REPOSITORY_KEY),
        );

        const data = await AsyncStorage.getMulti(bookmarkKeys);
        setRepositories(data ?? []);
      };

      retrieveBookmarkedRepositories();
    }, []),
  );

  useEffect(() => {
    // search repositories by full name
    const safeQuery = query.toLowerCase().trim();
    const filteredRepositories = repositories.filter((repo) =>
      repo.name.toLowerCase().includes(safeQuery),
    );

    // sort repositories
    const [sortBy, sortOrder] = sort.split("_");

    let compareFunction;
    if (sortOrder == "asc") {
      compareFunction = (a, b) => a[sortBy] - b[sortBy];
    } else if (sortOrder == "desc") {
      compareFunction = (a, b) => b[sortBy] - a[sortBy];
    }
    const updatedRepositories = filteredRepositories.sort(compareFunction);

    setDisplayedRepositories(updatedRepositories);
  }, [sort, query, repositories]);

  const debouncedSearch = useCallback(
    debounce((query) => setQuery(query), 100),
    [],
  );

  const removeBookmark = (isFilled, repository) => {
    if (isFilled) {
      return;
    }

    const updatedRepositories = repositories.filter(
      (repo) => repository.name != repo.name,
    );

    setRepositories(updatedRepositories);
  };

  return (
    <View style={styles.bookmarkedRepositories}>
      <View style={styles.bookmarkedRepositoriesControl}>
        <Search search={debouncedSearch} />

        <Select
          icon={sortIcon}
          initialOption={sort.value}
          onChange={setSort}
          options={[sortValues.MOST_RECENT, sortValues.LEAST_RECENT]}
          title="Sort By"
        />
      </View>

      <View style={styles.bookmarkedRepositoriesResults}>
        <FlatList
          data={displayedRepositories}
          keyExtractor={(item) => `${item.owner}/${item.repo}`}
          renderItem={({ item }) =>
            renderItem({
              item,
              onBookmarkChange: (isFilled) => removeBookmark(isFilled, item),
            })
          }
          ListEmptyComponent={
            <EmptyList
              text="No bookmarked repositories"
              buttonOptions={
                authState.token
                  ? {}
                  : { text: "Sign In to Start", route: routes.SIGN_IN }
              }
            />
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bookmarkedRepositories: {
    borderRadius: 10,
    padding: 5,
  },
  bookmarkedRepositoriesControl: {
    flexDirection: "row",
  },
  bookmarkedRepositoriesResults: {
    marginTop: 20,
  },
  bookmarkedRepositoriesResultsItem: {
    borderBottomColor: theme.colors.appBackground,
    borderBottomWidth: 1,
  },
});

export default BookmarkedRepositories;
