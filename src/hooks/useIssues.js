import { useQuery } from "react-query";
import dayjs from "dayjs";

import Issue from "~/services/api/issue";

const deserialize = (data = []) => {
  // response obtained from https://docs.github.com/en/rest/reference/issues#list-repository-issues
  return data
    .filter((issue) => !issue.pull_request)
    .map((issue) => ({
      description: issue.body,
      id: issue.id,
      image: (issue.user ?? {}).avatar_url,
      name: issue.title,
      owner: (issue.user ?? {}).login,
      dateCreated: dayjs(issue.created_at).format("DD MMM YYYY"),
    }));
};

const useIssues = (owner, repo) => {
  const queryData = useQuery(
    ["issues", owner, repo],
    () => Issue.getAll({ owner, repo }),
    {
      refetchInterval: 1000,
    },
  );

  return {
    ...queryData,
    data: deserialize(queryData.data),
  };
};

export default useIssues;
