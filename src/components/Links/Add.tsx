import { useSession } from "next-auth/react";
import { useState } from "react";
import { api } from "../../utils/api";
import type { FormEvent } from "react";
import Label from "./atom/Label";

const LinkAdd: React.FC = () => {
  const { data: sessionData } = useSession();
  const error = "";

  type FormLink = {
    slug: string;
    url: string;
    utm_source: string;
    utm_campaign: string;
    utm_medium: string;
    utm_term: string;
    utm_content: string;
  };

  const [formLink, setFormLink] = useState<FormLink>({ slug: "", url: "", utm_source: "", utm_campaign: "", utm_medium: "", utm_term: "", utm_content: "" });

  const utils = api.useContext();

  const mutation = api.link.add.useMutation({
    async onMutate(newLink) {
      await utils.link.getFromUser.cancel();
      const prevData = utils.link.getFromUser.getData();
      utils.link.getFromUser.setData(
        {
          user: sessionData?.user?.id ?? "",
        },
        (old) => [...old, newLink]
      );
      return { prevData };
    },
    onError(err, newLink, ctx) {
      utils.link.getFromUser.setData(
        {
          user: sessionData?.user?.id ?? "",
        },
        ctx?.prevData
      );
    },
    onSettled() {
      utils.link.getFromUser.invalidate();
    },
  });

  const slugCheck = api.link.check.useQuery(
    { slug: formLink.slug },
    {
      refetchOnReconnect: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  const handleChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    setFormLink({ ...formLink, [event.currentTarget.name]: event.currentTarget.value });
  };

  const handleChangeSlug = (event: React.SyntheticEvent<HTMLInputElement>) => {
    setFormLink({ ...formLink, [event.currentTarget.name]: event.currentTarget.value });
    slugCheck.refetch();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate({
      slug: formLink.slug,
      url: formLink.url,
      userId: sessionData?.user?.id,
      utm_source: formLink.utm_source,
      utm_campaign: formLink.utm_campaign,
      utm_medium: formLink.utm_medium,
      utm_term: formLink.utm_term,
      utm_content: formLink.utm_content,
    });
    setFormLink({ slug: "", url: "", utm_source: "", utm_campaign: "", utm_medium: "", utm_term: "", utm_content: "" });
  };

  return (
    <>
      <form
        className="m-auto my-12 grid max-w-2xl grid-cols-1 gap-4"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="flex flex-wrap justify-center gap-4 px-4">
          <div className="flex flex-[1_1_200px] flex-col">
            <Label for="slug" name="Slug" className="text-white" />

            <input className="p-2" type="text" name="slug" onChange={handleChangeSlug} value={formLink.slug} placeholder="Slug" required />
            {slugCheck.data ? <span className="-mb-8 mt-1 font-medium text-red-500">Slug already in use.</span> : ""}
          </div>
          <div className="flex flex-[1_1_200px] flex-col">
            <Label for="url" name="Url" className="text-white" />
            <input className="p-2" type="text" name="url" onChange={handleChange} value={formLink.url} placeholder="Url" required />
          </div>
        </div>
        <div className="my-4 flex flex-wrap justify-center gap-4 px-4">
          <div className="flex flex-[1_0_150px] flex-col">
            <Label for="utm_source" name="UTM Source" className="text-white" />
            <input className="p-2 " type="text" id="utm_source" name="utm_source" onChange={handleChange} value={formLink.utm_source} placeholder="referrer: google, instagram" />
          </div>
          <div className="flex flex-[1_0_150px] flex-col">
            <Label for="utm_campaign" name="UTM Campaign" className="text-white" />
            <input className="p-2" type="text" name="utm_campaign" onChange={handleChange} value={formLink.utm_campaign} placeholder="marketing medium: ads, social, email" />
          </div>
          <div className="flex flex-[1_0_150px] flex-col">
            <Label for="utm_medium" name="UTM Medium" className="text-white" />
            <input className="p-2" type="text" name="utm_medium" onChange={handleChange} value={formLink.utm_medium} placeholder="e.g.: product, promo code, etc" />
          </div>
          <div className="flex flex-[1_0_150px] flex-col">
            <Label for="utm_term" name="UTM Term" className="text-white" />
            <input className="p-2" type="text" name="utm_term" onChange={handleChange} value={formLink.utm_term} placeholder="Keywords" />
          </div>
          <div className="flex flex-[1_0_150px] flex-col">
            <Label for="utm_content" name="UTM Content" className="text-white" />
            <input className="p-2" type="text" name="utm_content" onChange={handleChange} value={formLink.utm_content} placeholder="Use to differentiate content" />
          </div>
        </div>
        <button className="bg-black p-4 text-white hover:bg-gray-900" type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? "Loading" : "Create"}
        </button>
        {error && <p>{error}</p>}
      </form>
    </>
  );
};

export default LinkAdd;
