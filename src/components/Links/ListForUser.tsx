import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import Item from "~/components/Links/widgets/Item";

import { useLinkContext } from "~/lib/context/linkContext";

const LinkList: React.FC = () => {
  const { data: sessionData } = useSession();

  const { isLoadingMutation } = useLinkContext();

  const { data: linkList } = api.link.getFromUser.useQuery(
    {
      user: sessionData?.user?.id ?? "",
    },
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="mx-auto my-16 grid max-w-7xl grid-cols-1 items-center justify-center gap-6 rounded bg-white p-4 text-black">
      {isLoadingMutation ? (
        <h2 className="py-8 text-center text-4xl font-bold">Loading</h2>
      ) : linkList && linkList?.length > 0 ? (
        <>
          <h2 className="py-8 text-center text-4xl font-bold">Your links</h2>
          <div className="flex flex-col transition">{linkList ? linkList?.map((link) => <Item {...link} key={link.slug} />) : <p className="text-xl">No links yet.</p>}</div>
        </>
      ) : (
        <h2 className="py-8 text-center text-4xl font-bold">No links yet.</h2>
      )}
    </div>
  );
};

export default LinkList;
