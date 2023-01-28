import { useSession } from "next-auth/react";
import { api } from "../../utils/api";
import Item from "./widgets/Item";

const LinkList: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: linkList } = api.link.getFromUser.useQuery(
    {
      user: sessionData?.user?.id ?? "",
    },
    { enabled: sessionData?.user !== undefined }
  );

  if (linkList && linkList.length > 0) {
    return (
      <div className="grid items-center justify-center grid-cols-1 gap-6 p-4 mx-auto my-16 text-black bg-white rounded max-w-7xl">
        <h2 className="py-8 text-4xl font-bold text-center">Your links</h2>
        <div className="flex flex-col transition">{linkList ? linkList?.map((link) => <Item {...link} key={link.slug} />) : <p className="text-xl">No links yet.</p>}</div>
      </div>
    );
  } else {
    return null;
  }
};

export default LinkList;
