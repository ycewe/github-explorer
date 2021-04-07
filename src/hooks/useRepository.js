import { useQuery } from "react-query";

import Repository from "~/services/api/repository";

const deserialize = (data = {}) => {
  // response obtained from https://docs.github.com/en/rest/reference/repos#get-a-repository
  return {
    description: data.description,
    id: data.id,
    image: (data.owner ?? {}).avatar_url,
    name: data.full_name,
    url: data.html_url,
  };
};

const useRepository = (owner, repo) => {
  const queryData = useQuery(["repository", owner, repo], () =>
    Repository.get({ owner, repo }),
  );

  return {
    ...queryData,
    data: deserialize(queryData.data),
  };
};

export default useRepository;
