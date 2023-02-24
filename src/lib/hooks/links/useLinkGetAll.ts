import { useEffect, useRef, useState } from "react";
import { api } from "~/utils/api";

const useLinkGetAll = (userId: string) => {
  const { data: linkList } = api.link.getFromUser.useQuery({
    user: userId,
  });

  const [tagList, setTagList] = useState<string[]>([]);
  const tagLoaded = useRef<boolean>(false);

  useEffect(() => {
    if (linkList && !tagLoaded.current) {
      let array = tagList;
      linkList?.map(({ tags }) => {
        const tagArr = tags?.split(",");
        tagArr?.map((tag) => {
          array = [...array, tag.trim()];
        });
      });
      array = Array.from(new Set(array));
      setTagList(array);
      tagLoaded.current = true;
    }
  }, [linkList, tagList]);

  return { linkList: linkList, tagList: tagList };
};

export default useLinkGetAll;
