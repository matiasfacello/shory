import type { SLink } from "@prisma/client";

/**
 * Format the input link to return destination URL.
 *
 * @param link Input link to format.
 */
export const formatLink = (link: SLink) => {
  const linkSource = link.utm_source ? "&utm_source=" + link.utm_source : "";
  const linkCampaign = link.utm_campaign ? "&utm_campaign=" + link.utm_campaign : "";
  const linkMedium = link.utm_medium ? "&utm_medium=" + link.utm_medium : "";
  const linkTerm = link.utm_term ? "&utm_term=" + link.utm_term : "";
  const linkContent = link.utm_content ? "&utm_content=" + link.utm_content : "";
  if (linkSource || linkCampaign || linkMedium || linkTerm || linkContent) return link.url + "/?" + linkSource + linkCampaign + linkMedium + linkTerm + linkContent;
  else return link.url;
};
