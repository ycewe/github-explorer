import { REPOSITORY_KEY } from "~/config/keys";

const generateRepositoryKey = (owner = "", repo = "") => {
  return `${REPOSITORY_KEY}_${owner}_${repo}`;
};

export { generateRepositoryKey };
