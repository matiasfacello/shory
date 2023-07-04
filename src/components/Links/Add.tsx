import { Icon } from "@iconify-icon/react";
import Puff from "~/assets/puff.svg";
import { formatTags } from "~/components/general/atoms/formatTags";
import { rndString } from "~/components/general/atoms/rndString";
import Loading from "~/components/general/widgets/Loading";
import Label from "~/components/Links/atom/Label";
import useLinkCreate from "~/lib/hooks/links/useLinkCreate";
import useLinkGetAll from "~/lib/hooks/links/useLinkGetAll";
import useLinkSlugCheck from "~/lib/hooks/links/useLinkSlugCheck";
import useUserSubCheck from "~/lib/hooks/user/useUserSubCheck";
import { LinkType } from "link";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const LinkAdd: React.FC = () => {
  const { data: sessionData } = useSession();

  const userSub = useUserSubCheck(sessionData?.user?.id || "");
  const { register, handleSubmit, setValue, watch, setError, trigger, formState } = useForm<LinkType>();
  const [advancedToggle, setAdvancedToggle] = useState(false);
  const { tagList } = useLinkGetAll(sessionData?.user?.id || "");

  const mutation = useLinkCreate();

  const slugCheck = useLinkSlugCheck(watch("slug", ""));

  const handleAdvanced = () => {
    setAdvancedToggle(!advancedToggle);
  };

  const onSubmit: SubmitHandler<LinkType> = async (data) => {
    if (!sessionData?.user?.id) {
      return null;
    }

    const refetch = await slugCheck.refetch();
    if (refetch.data?.used) {
      setError("slug", { type: "used", message: "Slug is already in use" });
      return;
    }

    mutation.mutate({
      slug: data.slug,
      url: data.url,
      userId: sessionData?.user?.id,
      tags: data.tags ? formatTags(data.tags) : null,
      utm_source: advancedToggle ? data.utm_source : null,
      utm_campaign: advancedToggle ? data.utm_campaign : null,
      utm_medium: advancedToggle ? data.utm_medium : null,
      utm_term: advancedToggle ? data.utm_term : null,
      utm_content: advancedToggle ? data.utm_content : null,
    });
  };

  if (!userSub || !tagList) return <Loading />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="m-auto my-12 grid max-w-2xl grid-cols-1 gap-4">
      <div className="flex flex-wrap justify-center gap-4 px-4">
        <div className="flex flex-[1_1_200px] flex-col">
          <Label for="slug" name="Slug" className="mb-2 text-xl text-white" required />
          <div className="mb-1 flex items-center">
            <input
              {...register("slug", {
                required: true,
                minLength: 6,
                maxLength: 32,
                pattern: /^\w{3,}$/,
              })}
              type="text"
              required
              className="w-full rounded p-2"
            />
            <Icon icon="material-symbols:cached-rounded" className="cursor-pointer p-2 text-2xl text-white" onClick={() => setValue("slug", rndString(6))} />
          </div>
          {formState.errors.slug && formState.errors.slug.type === "required" && <span className="font-medium text-red-500">Slug is required</span>}
          {formState.errors.slug && formState.errors.slug.type === "minLength" && <span className="font-medium text-red-500">Slug must be at least 6 characters long</span>}
          {formState.errors.slug && formState.errors.slug.type === "maxLength" && <span className="font-medium text-red-500">Slug cannot be longer than 32 characters long</span>}
          {formState.errors.slug && formState.errors.slug.type === "pattern" && <span className="font-medium text-red-500">Slug cannot have spaces nor special characters</span>}
          {formState.errors.slug && formState.errors.slug.type === "used" && <span className="font-medium text-red-500">Slug is alredy in use</span>}
        </div>
        <div className="flex flex-[1_1_200px] flex-col">
          <Label for="url" name="Url" className="mb-2 text-xl text-white" required />
          <div className="mb-1 flex items-center">
            <input
              {...register("url", {
                required: true,
                pattern: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[.\!\/\\w]*))?)/i,
              })}
              type="url"
              required
              className="w-full rounded p-2"
            />
          </div>
          {formState.errors.url && formState.errors.url.type === "required" && <span className="font-medium text-red-500">Url is required</span>}
          {formState.errors.url && formState.errors.url.type === "pattern" && <span className="font-medium text-red-500">Url cannot be considered a valid url</span>}
        </div>
      </div>
      <div className="mt-4 flex flex-wrap justify-center gap-4 px-4">
        <div className="flex flex-[1_1_200px] flex-col">
          <Label for="tags" name="Tags" className="mb-2 text-xl text-white" />
          <div className="mb-1 flex items-center">
            <input
              {...register("tags", {
                minLength: 3,
                maxLength: 32,
                pattern: /^[a-zA-Z,]+$/,
              })}
              type="text"
              className="w-full rounded p-2"
            />
          </div>
          {formState.errors.tags && formState.errors.tags.type === "minLength" && <span className="font-medium text-red-500">Tags must be at least 3 characters long</span>}
          {formState.errors.tags && formState.errors.tags.type === "maxLength" && <span className="font-medium text-red-500">Tags cannot be longer than 32 characters long</span>}
          {formState.errors.tags && formState.errors.tags.type === "pattern" && <span className="font-medium text-red-500">Tags can only be letters or commas</span>}
          <div className="mt-2 flex flex-wrap gap-3">
            {tagList &&
              tagList.map((tag) => (
                <div
                  className="cursor-pointer rounded-full bg-slate-100 px-3 py-2 text-xs font-medium"
                  key={tag}
                  onClick={() => (watch("tags", "") !== "" ? setValue("tags", watch("tags", "") + "," + tag) : setValue("tags", tag))}
                >
                  {tag}
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap justify-center gap-4 px-4">
        <div className="flex flex-[1_1_200px] flex-col">
          <Label for="slug" name="Advanced" className="mb-2 text-xl text-white" />
          <div className="relative flex items-start ">
            <div className="min-w-0 flex-1 text-sm">
              <p id="advanced-description" className="text-gray-300">
                UTMs advanced tagging options.
              </p>
            </div>
            <div className="ml-3 flex h-5 items-center">
              <input
                id="advanced"
                aria-describedby="advanced-description"
                name="advanced"
                onChange={handleAdvanced}
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      </div>
      {advancedToggle && (
        <div className="flex flex-wrap justify-center gap-4 px-4">
          <div className="flex flex-[1_1_200px] flex-col">
            <Label for="slug" name="UTM Source" className="mb-2 text-xl text-white" required />
            <div className="mb-1 flex items-center">
              <input
                {...register("utm_source", {
                  required: true,
                  minLength: 3,
                  maxLength: 32,
                  pattern: /^\w{3,}$/,
                })}
                type="text"
                required
                className="w-full rounded p-2"
              />
            </div>
            {formState.errors.utm_source && formState.errors.utm_source.type === "required" && <span className="font-medium text-red-500">UTM Source is required</span>}
            {formState.errors.utm_source && formState.errors.utm_source.type === "minLength" && <span className="font-medium text-red-500">UTM Source must be at least 3 characters long</span>}
            {formState.errors.utm_source && formState.errors.utm_source.type === "maxLength" && <span className="font-medium text-red-500">UTM Source cannot be longer than 32 characters long</span>}
            {formState.errors.utm_source && formState.errors.utm_source.type === "pattern" && <span className="font-medium text-red-500">UTM Source cannot have spaces nor special characters</span>}
          </div>
          <div className="flex flex-[1_1_200px] flex-col">
            <Label for="slug" name="UTM Campaign" className="mb-2 text-xl text-white" required />
            <div className="mb-1 flex items-center">
              <input
                {...register("utm_campaign", {
                  required: true,
                  minLength: 3,
                  maxLength: 32,
                  pattern: /^\w{3,}$/,
                })}
                type="text"
                required
                className="w-full rounded p-2"
              />
            </div>
            {formState.errors.utm_source && formState.errors.utm_source.type === "required" && <span className="font-medium text-red-500">UTM Campaign is required</span>}
            {formState.errors.utm_source && formState.errors.utm_source.type === "minLength" && <span className="font-medium text-red-500">UTM Campaign must be at least 3 characters long</span>}
            {formState.errors.utm_source && formState.errors.utm_source.type === "maxLength" && <span className="font-medium text-red-500">UTM Campaign cannot be longer than 32 characters long</span>}
            {formState.errors.utm_source && formState.errors.utm_source.type === "pattern" && <span className="font-medium text-red-500">UTM Campaign cannot have spaces nor special characters</span>}
          </div>
          <div className="flex flex-[1_1_200px] flex-col">
            <Label for="slug" name="UTM Medium" className="mb-2 text-xl text-white" required />
            <div className="mb-1 flex items-center">
              <input
                {...register("utm_medium", {
                  required: true,
                  minLength: 3,
                  maxLength: 32,
                  pattern: /^\w{3,}$/,
                })}
                type="text"
                required
                className="w-full rounded p-2"
              />
            </div>
            {formState.errors.utm_source && formState.errors.utm_source.type === "required" && <span className="font-medium text-red-500">UTM Medium is required</span>}
            {formState.errors.utm_source && formState.errors.utm_source.type === "minLength" && <span className="font-medium text-red-500">UTM Medium must be at least 3 characters long</span>}
            {formState.errors.utm_source && formState.errors.utm_source.type === "maxLength" && <span className="font-medium text-red-500">UTM Medium cannot be longer than 32 characters long</span>}
            {formState.errors.utm_source && formState.errors.utm_source.type === "pattern" && <span className="font-medium text-red-500">UTM Medium cannot have spaces nor special characters</span>}
          </div>
          <div className="flex flex-[1_1_200px] flex-col">
            <Label for="slug" name="UTM Term" className="mb-2 text-xl text-white" />
            <div className="mb-1 flex items-center">
              <input
                {...register("utm_term", {
                  minLength: 3,
                  maxLength: 32,
                  pattern: /^\w{3,}$/,
                })}
                type="text"
                className="w-full rounded p-2"
              />
            </div>
            {formState.errors.utm_source && formState.errors.utm_source.type === "minLength" && <span className="font-medium text-red-500">UTM Term must be at least 3 characters long</span>}
            {formState.errors.utm_source && formState.errors.utm_source.type === "maxLength" && <span className="font-medium text-red-500">UTM Term cannot be longer than 32 characters long</span>}
            {formState.errors.utm_source && formState.errors.utm_source.type === "pattern" && <span className="font-medium text-red-500">UTM Term cannot have spaces nor special characters</span>}
          </div>
          <div className="flex flex-[1_1_200px] flex-col">
            <Label for="slug" name="UTM Content" className="mb-2 text-xl text-white" />
            <div className="mb-1 flex items-center">
              <input
                {...register("utm_content", {
                  minLength: 3,
                  maxLength: 32,
                  pattern: /^\w{3,}$/,
                })}
                type="text"
                className="w-full rounded p-2"
              />
            </div>
            {formState.errors.utm_source && formState.errors.utm_source.type === "minLength" && <span className="font-medium text-red-500">UTM Content must be at least 3 characters long</span>}
            {formState.errors.utm_source && formState.errors.utm_source.type === "maxLength" && <span className="font-medium text-red-500">UTM Content cannot be longer than 32 characters long</span>}
            {formState.errors.utm_source && formState.errors.utm_source.type === "pattern" && <span className="font-medium text-red-500">UTM Content cannot have spaces nor special characters</span>}
          </div>
        </div>
      )}
      {!userSub?.canCreateLink ? (
        <div className={`mt-8 flex h-16 cursor-pointer items-center justify-center rounded bg-red-900 font-bold text-white transition-all hover:bg-red-900/80`}>Link Quota reached.</div>
      ) : mutation.isLoading || formState.isSubmitSuccessful ? (
        <div className="mt-8 flex h-16 items-center justify-center rounded bg-black p-4 text-white hover:bg-gray-900">
          <Image src={Puff} alt="Spin" height={32} />
        </div>
      ) : !formState.isDirty || !formState.isValid ? (
        <div
          className={`mt-8 flex h-16 cursor-pointer items-center justify-center rounded bg-black font-bold text-white transition-all hover:bg-black/80`}
          onClick={() => {
            trigger();
          }}
        >
          Validate
        </div>
      ) : (
        <input
          type="submit"
          className={`mt-8 h-16 cursor-pointer rounded bg-green-800 p-4 font-bold text-white transition-all hover:bg-green-800/80`}
          disabled={!formState.isDirty || !formState.isValid}
        />
      )}
    </form>
  );
};

export default LinkAdd;
