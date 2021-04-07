import { useQuery } from "react-query";

import User from "~/services/api/user";

const deserialize = (data = {}) => {
  // response obtained from https://docs.github.com/en/rest/reference/users#get-a-user
  return {
    fullName: data.name,
    location: data.location,
  };
};

const useUser = (username) => {
  const queryData = useQuery(["users", username], () => User.get({ username }));

  return {
    ...queryData,
    data: deserialize(queryData.data),
  };
};

export default useUser;
