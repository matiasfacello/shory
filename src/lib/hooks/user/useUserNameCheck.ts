import { api } from "~/utils/api";

const useUserNameCheck = (name: string) => {
  return api.user.checkName.useQuery(
    { name: name },
    {
      refetchOnReconnect: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
};

export default useUserNameCheck;
