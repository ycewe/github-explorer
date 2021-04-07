import React, { useMemo } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import DefaultLayout from "~/layouts/Default";
import Navigation from "~/components/Navigation";
import routes from "~/config/routes";
import BookmarkedRepositories from "./BookmarkedRepositories";
import SearchRepositories from "./SearchRepositories";
import useAuthentication from "~/hooks/useAuthentication";

import bookmarkNavIcon from "~/assets/bookmarkNav.png";
import searchNavIcon from "~/assets/searchNav.png";

const Tab = createStackNavigator();

const Home = () => {
  const {
    state: authState,
    dispatch: authDispatch,
    types,
  } = useAuthentication();

  const navigations = useMemo(
    () => [
      {
        name: "Bookmarks",
        icon: bookmarkNavIcon,
        route: routes.BOOKMARKED_REPOSITORIES,
        component: BookmarkedRepositories,
      },
      ...(authState.token
        ? [
            {
              name: "Search",
              icon: searchNavIcon,
              route: routes.SEARCH_REPOSITORIES,
              component: SearchRepositories,
            },
          ]
        : []),
    ],
    [authState.token],
  );

  return (
    <DefaultLayout
      header={
        <Navigation
          links={navigations}
          subLink={
            authState.token
              ? {
                  name: "Sign Out",
                  route: routes.HOME,
                  onPress: () => authDispatch({ type: types.SIGN_OUT }),
                }
              : {
                  name: "Sign In",
                  route: routes.SIGN_IN,
                }
          }
        />
      }
    >
      <Tab.Navigator
        initialRouteName={navigations[0].route}
        screenOptions={{
          headerShown: false,
        }}
      >
        {navigations.map((nav) => (
          <Tab.Screen
            key={nav.route}
            name={nav.route}
            component={nav.component}
          />
        ))}
      </Tab.Navigator>
    </DefaultLayout>
  );
};

export default Home;
