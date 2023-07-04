import { api } from "~/utils/api";
import { useRouter } from "next/router";

const useLinkCreate = () => {
  const router = useRouter();

  const utils = api.useContext();

  return api.link.add.useMutation({
    onError() {
      utils.link.getFromUser.invalidate();
    },
    onSuccess() {
      utils.link.getFromUser.invalidate();
      router.push("/");
    },
  });
};

export default useLinkCreate;
