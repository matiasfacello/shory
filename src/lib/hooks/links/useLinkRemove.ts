import { api } from "~/utils/api";

const useLinkRemove = () => {
  const utils = api.useContext();

  return api.link.delete.useMutation({
    onError() {
      utils.link.getFromUser.invalidate();
    },
    onSettled() {
      utils.link.getFromUser.invalidate();
    },
  });
};

export default useLinkRemove;
