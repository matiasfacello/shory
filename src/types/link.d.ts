declare module "link" {
  interface LinkType {
    slug: string;
    url: string;
    tags: string | null;
    utm_source: string | null;
    utm_campaign: string | null;
    utm_medium: string | null;
    utm_term: string | null;
    utm_content: string | null;
  }
}
