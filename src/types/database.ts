export type BusinessRole = "owner" | "admin" | "editor" | "viewer";

export interface BusinessMembership {
  business_id: string;
  role: BusinessRole;
  businesses: {
    id: string;
    name: string;
    slug: string;
  } | null;
}
