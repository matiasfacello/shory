import { useSession } from "next-auth/react";
import Link from "next/link";
import { api } from "../../utils/api";

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
      <div className="mx-auto my-16 grid max-w-lg grid-cols-1 items-center justify-center gap-6 rounded bg-white p-4 text-black">
        <h2 className="py-2 text-center text-4xl font-bold">Your links</h2>
        {linkList ? (
          linkList?.map((link) => (
            <div className="border p-3 text-xl shadow hover:bg-gray-100" key={link.slug}>
              <p>Name: {link.slug}</p>
              <p>Url: {link.url}</p>
              <Link className="mt-3 block border bg-slate-200 p-3 text-center hover:bg-slate-300" href={link.url}>
                Go to Link
              </Link>
            </div>
          ))
        ) : (
          <p className="text-xl">No links yet.</p>
        )}
      </div>
    );
  } else {
    return null;
  }
};

export default LinkList;
