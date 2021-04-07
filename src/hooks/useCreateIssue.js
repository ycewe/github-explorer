import { useMutation, useQueryClient } from "react-query";

import Issue from "~/services/api/issue";

function useCreateIssue(owner, repo) {
  const queryClient = useQueryClient();

  return useMutation((issue) => Issue.create({ owner, repo, params: issue }), {
    onSettled: () => {
      queryClient.refetchQueries(["issues", owner, repo]);
    },
  });
}

export default useCreateIssue;
