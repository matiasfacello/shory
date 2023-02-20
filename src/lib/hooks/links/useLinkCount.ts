import { api } from "~/utils/api";

const useLinkCount = (userId: string) => {
  return api.link.count.useQuery({ userId: userId });
};

export default useLinkCount;
