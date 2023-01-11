import { useSession } from "next-auth/react";
import { useState } from "react";
import { api } from "../../utils/api";

const LinkAdd: React.FC = () => {
  const { data: sessionData } = useSession();
  const error = "";

  type FormLink = {
    slug: string;
    url: string;
  };

  const [formLink, setFormLink] = useState<FormLink>({ slug: "", url: "" });
  const mutation = api.link.add.useMutation();

  return (
    <>
      <form
        className="m-auto my-12 flex max-w-lg flex-wrap gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          mutation.mutate({ slug: formLink.slug, url: formLink.url, userId: sessionData?.user?.id });
          setFormLink({ slug: "", url: "" });
        }}
      >
        <input
          className="flex-[0_0_150px] p-2"
          type="text"
          onChange={(e) => {
            setFormLink({
              ...formLink,
              slug: e.target.value,
            });
          }}
          value={formLink.slug}
          placeholder="Slug"
          required
        />
        <input
          className="flex-[1_0_200px] p-2"
          type="text"
          onChange={(e) => {
            setFormLink({
              ...formLink,
              url: e.target.value,
            });
          }}
          value={formLink.url}
          placeholder="Url"
          required
        />
        <button
          className="flex-[1_0_100px] bg-black p-4 text-white hover:bg-gray-900"
          type="submit"
          disabled={mutation.isLoading}
        >
          Create
        </button>
        {error && <p>{error}</p>}
      </form>
    </>
  );
};

export default LinkAdd;
