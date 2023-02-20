// import { useSession } from "next-auth/react";
import reloadSession from "~/components/general/atoms/reloadSession";
import { api } from "~/utils/api";

const useUserDelete = () => {
  return api.user.delete.useMutation({
    async onMutate() {
      reloadSession();
    },
    onError() {
      reloadSession();
    },
    onSettled() {
      reloadSession();
    },
  });
};

export default useUserDelete;
