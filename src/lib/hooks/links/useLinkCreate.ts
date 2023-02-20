import { api } from "~/utils/api";

const useLinkCreate = () => {
  const utils = api.useContext();

  return api.link.add.useMutation({
    onError() {
      utils.link.getFromUser.invalidate();
    },
    onSettled() {
      utils.link.getFromUser.invalidate();
    },
  });
};

export default useLinkCreate;
