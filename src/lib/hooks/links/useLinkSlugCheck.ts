import { api } from "../../../utils/api";

const useLinkSlugCheck = (formSlug: string) => {
  return api.link.check.useQuery(
    { slug: formSlug },
    {
      refetchOnReconnect: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
};

export default useLinkSlugCheck;
