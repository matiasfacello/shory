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

  interface FormError {
    errorless: boolean;
    block: boolean;
    slug?: InputError;
    url?: InputError;
    tags?: InputError;
    utm_source?: InputError;
    utm_campaign?: InputError;
    utm_medium?: InputError;
    utm_term?: InputError;
    utm_content?: InputError;
  }

  interface InputError {
    empty?: string;
    lenght?: string;
    pattern?: string;
    used?: string;
  }
}
