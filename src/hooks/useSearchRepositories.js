import { useQuery } from "react-query";

import Repository from "~/services/api/repository";

const deserialize = (data = {}) => {
  // response obtained from https://docs.github.com/en/rest/reference/search#search-repositories
  const items = data.items ?? [];

  return items.map((item) => ({
    description: item.description,
    id: item.id,
    image: (item.owner ?? {}).avatar_url,
    name: item.full_name,
    owner: (item.owner ?? {}).login,
    repo: item.name,
    url: item.html_url,
  }));
};

const useSearchRepositories = (query) => {
  const queryData = useQuery(
    ["repositories", query],
    () => Repository.searchAll({ query }),
    {
      enabled: Boolean(query),
    },
  );

  return {
    ...queryData,
    data: deserialize(queryData.data),
  };
};

export default useSearchRepositories;
