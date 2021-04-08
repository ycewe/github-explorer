import base from ".";

const Repository = {
  get: async ({ owner = "", repo = "" }) => {
    try {
      const response = await fetch(`${base.url}/repos/${owner}/${repo}`, {
        headers: base.headers,
      });

      return response.json();
    } catch (error) {
      console.error(error);
    }
  },

  searchAll: async ({ query = "", page = 1, perPage = 50 }) => {
    const params = `q=${query}&page=${page}&per_page=${perPage}`;

    try {
      const response = await fetch(
        `${base.url}/search/repositories?${params}`,
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

export default Repository;
