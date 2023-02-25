import { useSession } from "next-auth/react";
import { useState } from "react";
import Item from "~/components/Links/widgets/Item";

import useLinkGetAll from "~/lib/hooks/links/useLinkGetAll";

import { useLinkContext } from "~/lib/context/linkContext";

const LinkList: React.FC = () => {
  const { data: sessionData } = useSession();

  const { isLoadingMutation } = useLinkContext();

  const { tagList, linkList } = useLinkGetAll(sessionData?.user?.id || "");

  const [filterTag, setFilterTag] = useState<string | null>(null);

  return (
    <div className="mx-auto my-16 grid max-w-7xl grid-cols-1 items-center justify-center gap-6 rounded bg-white p-4 text-black">
      {isLoadingMutation ? (
        <h2 className="py-8 text-center text-4xl font-bold">Loading</h2>
      ) : linkList && linkList?.length > 0 ? (
        <>
          <h2 className="py-8 text-center text-4xl font-bold">Your links</h2>
          <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <div
              className={`cursor-pointer rounded-full py-2 px-4 text-sm transition ${filterTag === null ? "bg-red-300 font-bold" : "bg-red-200 font-medium"}`}
              onClick={() => {
                setFilterTag(null);
              }}
            >
              No filter
            </div>
            {tagList.map((tag) => (
              <div
                className={`cursor-pointer rounded-full py-2 px-4 text-sm transition ${filterTag === tag ? "scale-110 bg-slate-300 font-bold" : "bg-slate-200 font-medium "}`}
                key={tag}
                onClick={() => {
                  setFilterTag(tag);
                }}
              >
                {tag}
              </div>
            ))}
          </div>
          <div className="flex flex-col transition">
            {linkList ? (
              filterTag ? (
                linkList.filter((link) => link.tags?.toLowerCase().includes(filterTag.toLowerCase())).map((link) => <Item {...link} key={link.slug} />)
              ) : (
                linkList.map((link) => <Item {...link} key={link.slug} />)
              )
            ) : (
              <p className="text-xl">No links yet.</p>
            )}
          </div>
        </>
      ) : (
        <h2 className="py-8 text-center text-4xl font-bold">No links yet.</h2>
      )}
    </div>
  );
};

export default LinkList;
