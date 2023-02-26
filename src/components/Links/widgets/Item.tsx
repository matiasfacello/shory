import { env } from "~/env.mjs";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify-icon/react";
import { api } from "../../../utils/api";
import { formatTags } from "~/components/general/atoms/formatTags";

import type { SLink } from "@prisma/client";
import type { FormEvent } from "react";

import Label from "../atom/Label";
import LinkBoxes from "../atom/LinkBoxes";
import StatItem from "../atom/StatItem";
import useLinkRemove from "../../../lib/hooks/links/useLinkRemove";
import useLinkEdit from "../../../lib/hooks/links/useLinkEdit";

const Item = (link: SLink) => {
  const { data: sessionData } = useSession();

  const hideBoxes = () => {
    setShowShare(false);
    setShowStats(false);
    setShowUTM(false);
    setShowDelete(false);
    setShowEdit(false);
  };

  const [showShare, setShowShare] = useState(false);

  const handleShare = () => {
    if (showShare) {
      setShowShare(false);
    } else {
      hideBoxes();
      setShowShare(true);
    }
  };

  const [showStats, setShowStats] = useState(false);

  const handleStats = () => {
    if (showStats) {
      setShowStats(false);
    } else {
      hideBoxes();
      setShowStats(true);
    }
  };

  const [showUTM, setShowUTM] = useState(false);

  const handleUTM = () => {
    if (showUTM) {
      setShowUTM(false);
    } else {
      hideBoxes();
      setShowUTM(true);
    }
  };

  const [showEdit, setShowEdit] = useState(false);

  const handleEdit = () => {
    if (showEdit) {
      setShowEdit(false);
    } else {
      hideBoxes();
      setShowEdit(true);
    }
  };

  const [showDelete, setShowDelete] = useState(false);

  const handleDelete = () => {
    if (showDelete) {
      setShowDelete(false);
    } else {
      hideBoxes();
      setShowDelete(true);
    }
  };

  const [copyShared, setCopyShared] = useState<boolean>(false);

  const goTo = {
    url: env.NEXT_PUBLIC_HOST + "/" + link.slug,
    whatsapp: "https://web.whatsapp.com/send/?type=custom_url&app_absent=0&text=" + env.NEXT_PUBLIC_HOST.replace(/[:]/g, "%3A").replace(/[\/]/g, "%2F") + "%2F" + link.slug,
  };

  const handleShareCopy = () => {
    setCopyShared(true);

    navigator.clipboard.writeText(goTo.url);
    setTimeout(() => setCopyShared(false), 4000);
  };

  const handleShareWidget = () => {
    const data = {
      title: "Redirects to " + link.slug.toUpperCase(),
      url: goTo.url,
    };
    navigator.share(data);
  };

  const { data: stats } = api.clicks.getLinkFromUser.useQuery(
    {
      linkId: link.id || 0,
    },
    { enabled: sessionData?.user !== undefined }
  );

  const [formEdit, setFormEdit] = useState({
    id: link.id || 0,
    slug: link.slug || "",
    url: link.url || "",
    tags: link.tags || "",
    utm_source: link.utm_source || "",
    utm_campaign: link.utm_campaign || "",
    utm_medium: link.utm_medium || "",
    utm_term: link.utm_term || "",
    utm_content: link.utm_content || "",
  });

  const handleChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    setFormEdit({ ...formEdit, [event.currentTarget.name]: event.currentTarget.value });
  };

  const handleTagChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    setFormEdit({ ...formEdit, [event.currentTarget.name]: formatTags(event.currentTarget.value.replace(/[^A-Za-z0-9,_-]/g, "")) });
  };

  const editing = useLinkEdit();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    editing.mutate({
      id: formEdit.id,
      slug: formEdit.slug,
      url: formEdit.url,
      tags: formEdit.tags,
      userId: sessionData?.user?.id || "",
      utm_source: formEdit.utm_source,
      utm_campaign: formEdit.utm_campaign,
      utm_medium: formEdit.utm_medium,
      utm_term: formEdit.utm_term,
      utm_content: formEdit.utm_content,
    });
    setFormEdit({
      id: formEdit.id,
      slug: formEdit.slug,
      url: formEdit.url,
      tags: formEdit.tags,
      utm_source: formEdit.utm_source || "",
      utm_campaign: formEdit.utm_campaign || "",
      utm_medium: formEdit.utm_medium || "",
      utm_term: formEdit.utm_term || "",
      utm_content: formEdit.utm_content || "",
    });
    setShowEdit(false);
  };

  const removing = useLinkRemove();

  const ConfirmDelete = (link: SLink) => {
    removing.mutate({
      slug: link.slug,
      user: sessionData?.user?.id || "",
    });
  };

  return (
    <>
      <div className="mx-6 mb-6 flex flex-wrap border text-lg shadow" key={link.slug}>
        <div className="w-full p-3 md:w-6/12">
          <Link className="font-medium hover:font-bold hover:text-slate-900" href={link.slug} target="_blank">
            {link.slug}
          </Link>
          <p className="text-sm">{link.url}</p>
          <p className="text-sm">Tags: {link.tags ? link.tags : "none."}</p>
        </div>
        <div className="grid w-full grid-cols-3 text-center md:w-6/12 md:gap-x-4 md:gap-y-3 md:p-3">
          <button className={`w-full border-slate-600 px-2 py-2 text-sm font-medium shadow hover:bg-stone-300 ${showShare ? "bg-stone-400" : "bg-stone-200"}`} onClick={handleShare}>
            Share
          </button>
          <button className={`w-full border-slate-600 px-2 py-2 text-sm font-medium shadow hover:bg-stone-300 ${showStats ? "bg-stone-400" : "bg-stone-200"}`} onClick={handleStats}>
            Stats
          </button>
          <button className={`w-full border-slate-600 px-2 py-2 text-sm font-medium shadow hover:bg-stone-300 ${showUTM ? "bg-stone-400" : "bg-stone-200"}`} onClick={handleUTM}>
            UTM
          </button>
          <button className={`w-full border-slate-600 px-2 py-2 text-sm font-medium shadow hover:bg-stone-300 ${showEdit ? "bg-stone-400" : "bg-stone-200"}`} onClick={handleEdit}>
            Edit
          </button>
          <button className={`w-full border-slate-600 px-2 py-2 text-sm font-medium shadow hover:bg-stone-300 ${showDelete ? "bg-stone-400" : "bg-stone-200"}`} onClick={handleDelete}>
            Delete
          </button>
        </div>

        {showShare && (
          <LinkBoxes
            title="Share"
            closeButton={() => {
              setShowShare(false);
            }}
          >
            <div className="flex flex-wrap items-center  justify-center gap-4">
              <Link
                href={goTo.whatsapp}
                target="_blank"
                className="flex h-12 w-16 items-center justify-center rounded border-slate-600 bg-stone-200 px-4 py-2 text-sm font-medium shadow hover:bg-stone-300"
              >
                <Icon icon="ic:round-whatsapp" width="32" height="32" />
              </Link>
              <button className="h-12 w-48 rounded border-slate-600 bg-stone-200 px-4 py-2 text-sm font-medium shadow hover:bg-stone-300" onClick={handleShareCopy}>
                {copyShared ? "Copied!" : "Copy to Clipboard"}
              </button>
              <button className="h-12 w-48 rounded border-slate-600 bg-stone-200 px-4 py-2 text-sm font-medium shadow hover:bg-stone-300" onClick={handleShareWidget}>
                Share Widget
              </button>
            </div>
          </LinkBoxes>
        )}

        {showStats && (
          <LinkBoxes
            title="Stats"
            closeButton={() => {
              setShowStats(false);
            }}
          >
            <div className="p-1 text-center">{stats ? stats.map((stat, i) => <StatItem {...stat} index={i + 1} key={stat.id} />) : <p className="text-xl">No clicks yet.</p>}</div>
          </LinkBoxes>
        )}

        {showUTM && (
          <LinkBoxes
            title="UTM"
            closeButton={() => {
              setShowUTM(false);
            }}
          >
            <p className="p-1 text-center">
              SOURCE
              <br />
              {link.utm_source ? link.utm_source : "-"}
            </p>
            <p className="p-1 text-center">
              CAMPAIGN
              <br />
              {link.utm_campaign ? link.utm_campaign : "-"}
            </p>
            <p className="p-1 text-center">
              MEDIUM
              <br />
              {link.utm_medium ? link.utm_medium : "-"}
            </p>
            <p className="p-1 text-center">
              TERM
              <br />
              {link.utm_term ? link.utm_term : "-"}
            </p>
            <p className="p-1 text-center">
              CONTENT
              <br />
              {link.utm_content ? link.utm_content : "-"}
            </p>
          </LinkBoxes>
        )}

        {showEdit && (
          <LinkBoxes
            title="Edit"
            closeButton={() => {
              setShowEdit(false);
            }}
          >
            <form
              className="px-6 text-black"
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <div className="mb-6 flex flex-wrap justify-center gap-4">
                <div className="flex flex-[1_1_300px] flex-col ">
                  <Label for="slug" name="Slug" />
                  <input className="rounded border bg-stone-100 p-2 shadow" type="text" id="slug" name="slug" onChange={handleChange} value={formEdit.slug} placeholder="Slug" />
                  <input className="hidden p-2" type="hidden" id="id" name="id" onChange={handleChange} value={formEdit.id} />
                </div>
                <div className="flex flex-[1_1_300px] flex-col">
                  <Label for="url" name="Url" />
                  <input className="rounded border bg-stone-100 p-2 shadow" type="text" id="url" name="url" onChange={handleChange} value={formEdit.url} placeholder="Url" />
                </div>
              </div>
              <div className="mb-6 flex flex-wrap justify-center gap-4">
                <div className="flex flex-[1_1_300px] flex-col">
                  <Label for="tags" name="Tags" />
                  <input className="rounded border bg-stone-100 p-2 shadow" type="text" id="tags" name="tags" onChange={handleTagChange} value={formEdit.tags} placeholder="Tags" />
                </div>
                <div className="flex flex-[1_1_300px] flex-col">
                  <Label for="utm_source" name="UTM Source" />
                  <input
                    className="rounded border bg-stone-100 p-2 shadow"
                    type="text"
                    id="utm_source"
                    name="utm_source"
                    onChange={handleChange}
                    value={formEdit.utm_source}
                    placeholder="referrer: google, instagram"
                  />
                </div>
                <div className="flex flex-[1_1_300px] flex-col">
                  <Label for="utm_campaign" name="UTM Campaign" />
                  <input
                    className="rounded border bg-stone-100 p-2 shadow"
                    type="text"
                    id="utm_campaign"
                    name="utm_campaign"
                    onChange={handleChange}
                    value={formEdit.utm_campaign}
                    placeholder="marketing medium: ads, social, email"
                  />
                </div>
                <div className="flex flex-[1_1_300px] flex-col">
                  <Label for="utm_medium" name="UTM Medium" />
                  <input
                    className="rounded border bg-stone-100 p-2 shadow"
                    type="text"
                    id="utm_medium"
                    name="utm_medium"
                    onChange={handleChange}
                    value={formEdit.utm_medium}
                    placeholder="e.g.: product, promo code, etc"
                  />
                </div>
                <div className="flex flex-[1_1_300px] flex-col">
                  <Label for="utm_term" name="UTM Term" />
                  <input className="rounded border bg-stone-100 p-2 shadow" type="text" id="utm_term" name="utm_term" onChange={handleChange} value={formEdit.utm_term} placeholder="Keywords" />
                </div>
                <div className="flex flex-[1_1_300px] flex-col">
                  <Label for="utm_content" name="UTM Content" />
                  <input
                    className="rounded border bg-stone-100 p-2 shadow"
                    type="text"
                    id="utm_content"
                    name="utm_content"
                    onChange={handleChange}
                    value={formEdit.utm_content}
                    placeholder="Use to differentiate content"
                  />
                </div>
              </div>
              <button className="mx-auto my-4 block bg-black px-6 py-3 text-center text-white hover:bg-gray-900" type="submit" disabled={editing.isLoading}>
                {editing.isLoading ? "Loading" : "Edit"}
              </button>
            </form>
          </LinkBoxes>
        )}

        {showDelete && (
          <LinkBoxes
            title="Delete"
            closeButton={() => {
              setShowDelete(false);
            }}
          >
            <Icon icon="material-symbols:cancel" className="cursor-pointer p-2 text-4xl" onClick={handleDelete} />
            <Icon
              icon="material-symbols:check-box-rounded"
              className="cursor-pointer p-2 text-4xl"
              onClick={() => {
                ConfirmDelete(link);
              }}
            />
          </LinkBoxes>
        )}
      </div>
    </>
  );
};

export default Item;
