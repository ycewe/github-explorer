import { GITHUB_TOKEN } from "@env";
import base from ".";

const Issue = {
  create: async ({ owner = "", repo = "", params = {} }) => {
    try {
      const response = await fetch(
        `${base.url}/repos/${owner}/${repo}/issues`,
        {
          method: "POST",
          headers: {
            ...base.headers,
            Authorization: `token ${GITHUB_TOKEN}`,
          },
          body: JSON.stringify(params),
        },
      );

      return response.json();
    } catch (error) {
      console.error(error);
    }
  },

  getAll: async ({
    owner = "",
    repo = "",
    state = "open",
    sort = "created",
    direction = "desc",
  }) => {
    const params = `direction=${direction}&sort=${sort}&state=${state}`;

    try {
      const response = await fetch(
        `${base.url}/repos/${owner}/${repo}/issues?${params}`,
        {
          headers: base.headers,
        },
      );

      return response.json();
    } catch (error) {
      console.error(error);
    }
  },
};

export default Issue;
