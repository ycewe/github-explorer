import React, { createContext, useContext, useReducer } from "react";
import PropTypes from "prop-types";
import { ADMIN_USERNAME, ADMIN_PASSWORD } from "@env";

import AsyncStorage from "~/services/asyncStorage";
import { AUTHENTICATION_KEY, USER_KEY } from "~/config/keys";

const TOKEN = "validToken"; // to be retrieved from the API

const DispatchContext = createContext();
const StateContext = createContext();

const types = {
  SIGN_IN: "Sign In",
  SIGN_UP: "Sign Up",
  SIGN_OUT: "Sign Out",
  CLEAR_ERROR: "Clear Error",
};

const state = {
  token: "",
  error: "",
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case types.SIGN_IN:
      return {
        ...state,
        token: payload.token ?? "",
        error: payload.error ?? "",
      };
    case types.SIGN_OUT:
      return {
        ...state,
        token: "",
      };
    case types.CLEAR_ERROR:
      return {
        ...state,
        error: "",
      };
    default:
      return state;
  }
};

const useAuthentication = () => {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

  // thunk to perform asynchronous calls and business logic
  const enhancedDispatch = async ({ type, payload }) => {
    switch (type) {
      case types.SIGN_IN: {
        const user =
          (await AsyncStorage.get(`${USER_KEY}_${payload.username}`)) ?? {};

        if (
          payload.password == user.password ||
          (payload.username == ADMIN_USERNAME &&
            payload.password == ADMIN_PASSWORD)
        ) {
          await AsyncStorage.set(AUTHENTICATION_KEY, TOKEN);

          dispatch({
            type: types.SIGN_IN,
            payload: {
              token: TOKEN,
            },
          });
        } else {
          dispatch({
            type: types.SIGN_IN,
            payload: {
              error: "Invalid username or password. Please try again.",
            },
          });
        }
        break;
      }
      case types.SIGN_UP: {
        const { username = "", password = "" } = payload;

        await AsyncStorage.set(`${USER_KEY}_${username}`, {
          password,
        });

        dispatch({
          type: types.SIGN_IN,
          payload: {
            token: TOKEN,
          },
        });

        break;
      }
      case types.SIGN_OUT: {
        await AsyncStorage.delete(AUTHENTICATION_KEY);

        dispatch({
          type: types.SIGN_OUT,
        });

        break;
      }
      default:
        dispatch({ type, payload });
    }
  };

  return {
    dispatch: enhancedDispatch,
    state,
    types,
  };
};

const AuthenticationProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(reducer, state);

  return (
    <DispatchContext.Provider value={authDispatch}>
      <StateContext.Provider value={authState}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

AuthenticationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default useAuthentication;
export { AuthenticationProvider };
