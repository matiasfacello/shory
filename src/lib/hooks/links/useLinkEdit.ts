import { api } from "~/utils/api";

const useLinkEdit = () => {
  const utils = api.useContext();

  return api.link.update.useMutation({
    onError() {
      utils.link.getFromUser.invalidate();
    },
    onSettled() {
      utils.link.getFromUser.invalidate();
    },
  });
};

export default useLinkEdit;
