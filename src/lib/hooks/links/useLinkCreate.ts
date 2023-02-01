import { useSession } from "next-auth/react";
import { api } from "../../../utils/api";

const useLinkCreate = () => {
  const { data: sessionData } = useSession();

  const utils = api.useContext();

  return api.link.add.useMutation({
    async onMutate(newLink) {
      await utils.link.getFromUser.cancel();
      const prevData = utils.link.getFromUser.getData();
      utils.link.getFromUser.setData(
        {
          user: sessionData?.user?.id ?? "",
        },
        (old) => [...old, newLink]
      );
      return { prevData };
    },
    onError(err, newLink, ctx) {
      utils.link.getFromUser.setData(
        {
          user: sessionData?.user?.id ?? "",
        },
        ctx?.prevData
      );
    },
    onSettled() {
      utils.link.getFromUser.invalidate();
    },
  });
};

export default useLinkCreate;
