declare module "click" {
  interface ClickType {
    id?: number;
    linkId: number;
    slug: string;
    url: string;
    ip: string | null;
    geo: string | null;
    createdAt: Date;
  }
}
