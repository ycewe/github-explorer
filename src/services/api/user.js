import base from ".";

const User = {
  get: async ({ username = "" }) => {
    try {
      const response = await fetch(`${base.url}/users/${username}`, {
        headers: base.headers,
      });

      return response.json();
    } catch (error) {
      console.error(error);
    }
  },
};

export default User;
