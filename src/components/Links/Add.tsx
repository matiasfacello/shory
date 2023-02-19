import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import Label from "./atom/Label";
import { Icon } from "@iconify-icon/react";
import { rndString } from "../general/atoms/rndString";

import useLinkCreate from "../../lib/hooks/links/useLinkCreate";
import useLinkSlugCheck from "../../lib/hooks/links/useLinkSlugCheck";
import useLinkCount from "../../lib/hooks/links/useLinkCount";
import useUserSubCheck from "../../lib/hooks/user/useUserSubCheck";
import { useLinkContext } from "../../lib/context/linkContext";

import type { FormEvent } from "react";
import type { LinkType } from "link";
import Link from "next/link";

const LinkAdd: React.FC = () => {
  const { data: sessionData } = useSession();
  const error = "";

  const { setIsLoadingMutation } = useLinkContext();

  const [formLink, setFormLink] = useState<LinkType>({ slug: "", url: "", tags: null, utm_source: null, utm_campaign: null, utm_medium: null, utm_term: null, utm_content: null });

  const [formError, setFormError] = useState("");

  const slugCheck = useLinkSlugCheck(formLink.slug);

  const subCheck = useUserSubCheck(sessionData?.user.id || "");
  const linkCount = useLinkCount(sessionData?.user.id || "");
  const [linkFull, setLinkFull] = useState(false);

  useEffect(() => {
    if (linkCount.data && subCheck) {
      if (linkCount.data >= subCheck.linkQuota) {
        setLinkFull(true);
      } else setLinkFull(false);
    }
  }, [linkCount.data, subCheck]);

  const handleChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    setFormLink({ ...formLink, [event.currentTarget.name]: event.currentTarget.value });
  };

  const handleChangeSlug = (event: React.SyntheticEvent<HTMLInputElement>) => {
    setFormLink({ ...formLink, [event.currentTarget.name]: event.currentTarget.value });
    slugCheck.refetch();
  };

  const mutation = useLinkCreate();

  if (mutation.isLoading) setIsLoadingMutation(true);
  else setIsLoadingMutation(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!sessionData) return;

    if (linkFull) return;

    setFormError("");
    if (formLink.slug.length < 6) {
      setFormError("Slug is too short");
      return;
    }

    mutation.mutate({
      slug: formLink.slug,
      url: formLink.url,
      tags: formLink.tags || undefined,
      userId: sessionData?.user?.id || undefined,
      utm_source: formLink.utm_source || undefined,
      utm_campaign: formLink.utm_campaign || undefined,
      utm_medium: formLink.utm_medium || undefined,
      utm_term: formLink.utm_term || undefined,
      utm_content: formLink.utm_content || undefined,
    });
    setFormLink({ slug: "", url: "", tags: "", utm_source: "", utm_campaign: "", utm_medium: "", utm_term: "", utm_content: "" });
  };

  const generateSlug = () => {
    const random = rndString(6);
    setFormLink({ ...formLink, slug: random });
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
            <div className="flex items-center">
              <input className="flex-[1_1_200px] p-2" minLength={6} type="text" name="slug" onChange={handleChangeSlug} value={formLink.slug} placeholder="yourslug" required />
              <Icon icon="material-symbols:cached-rounded" className="cursor-pointer p-2 text-2xl text-white" onClick={generateSlug} />
            </div>
            {slugCheck.data ? <span className="-mb-8 mt-1 font-medium text-red-500">Slug already in use.</span> : ""}
            {formError && <span className="-mb-8 mt-1 font-medium text-red-500">{formError}</span>}
          </div>
          <div className="flex flex-[1_1_200px] flex-col">
            <Label for="url" name="Url" className="text-white" />
            <input className="p-2" type="url" name="url" onChange={handleChange} value={formLink.url} placeholder="https://www.google.com" required />
          </div>
        </div>
        <div className="my-4 flex flex-wrap justify-center gap-4 px-4">
          <div className="flex flex-[1_0_150px] flex-col">
            <Label for="tags" name="Tags" className="text-white" />
            <input className="p-2 " type="text" id="tags" name="tags" onChange={handleChange} value={formLink.tags || ""} placeholder="tags" />
          </div>
          <div className="flex flex-[1_0_150px] flex-col">
            <Label for="utm_source" name="UTM Source" className="text-white" />
            <input className="p-2 " type="text" id="utm_source" name="utm_source" onChange={handleChange} value={formLink.utm_source || ""} placeholder="referrer: google, instagram" />
          </div>
          <div className="flex flex-[1_0_150px] flex-col">
            <Label for="utm_campaign" name="UTM Campaign" className="text-white" />
            <input className="p-2" type="text" name="utm_campaign" onChange={handleChange} value={formLink.utm_campaign || ""} placeholder="marketing medium: ads, social, email" />
          </div>
          <div className="flex flex-[1_0_150px] flex-col">
            <Label for="utm_medium" name="UTM Medium" className="text-white" />
            <input className="p-2" type="text" name="utm_medium" onChange={handleChange} value={formLink.utm_medium || ""} placeholder="e.g.: product, promo code, etc" />
          </div>
          <div className="flex flex-[1_0_150px] flex-col">
            <Label for="utm_term" name="UTM Term" className="text-white" />
            <input className="p-2" type="text" name="utm_term" onChange={handleChange} value={formLink.utm_term || ""} placeholder="Keywords" />
          </div>
          <div className="flex flex-[1_0_150px] flex-col">
            <Label for="utm_content" name="UTM Content" className="text-white" />
            <input className="p-2" type="text" name="utm_content" onChange={handleChange} value={formLink.utm_content || ""} placeholder="Use to differentiate content" />
          </div>
        </div>
        {sessionData ? (
          <>
            {linkFull ? (
              <button className="bg-black p-4 text-white hover:bg-gray-900" disabled>
                No more quota.{" "}
                <Link href="/upgrade" className="font-bold">
                  Upgrade!
                </Link>
              </button>
            ) : (
              <button className="bg-black p-4 text-white hover:bg-gray-900" type="submit" disabled={mutation.isLoading}>
                {mutation.isLoading ? "Loading" : "Create"}
              </button>
            )}
          </>
        ) : (
          <button className="bg-black p-4 text-white hover:bg-gray-900" onClick={() => signIn()}>
            Login to create
          </button>
        )}
        {error && <p>{error}</p>}
      </form>
    </>
  );
};

export default LinkAdd;
