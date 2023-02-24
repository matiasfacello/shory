/**
 * Format the input tags for the add Link form.
 *
 * @param tags Input of tags to format.
 */
export const formatTags = (tags: string) => {
  const tagsArr = [...new Set(tags.split(","))];

  const data = tagsArr.map((tag) => (tag = tag.trim().replace(/[ ]/g, ","))).join(",");

  return data;
};
