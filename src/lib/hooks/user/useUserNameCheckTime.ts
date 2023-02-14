import { api } from "../../../utils/api";

const useUserNameCheckTime = (id: string) => {
  return api.user.checkTime.useQuery(
    { id: id },
    {
      refetchOnReconnect: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
};

export default useUserNameCheckTime;
