declare module "link" {
  interface LinkType {
    slug: string;
    url: string;
    utm_source: string | null;
    utm_campaign: string | null;
    utm_medium: string | null;
    utm_term: string | null;
    utm_content: string | null;
  }

  interface LinkInDBType {
    id: number;
    slug: string;
    url: string;
    utm_source: string | null;
    utm_campaign: string | null;
    utm_medium: string | null;
    utm_term: string | null;
    utm_content: string | null;
  }
}
