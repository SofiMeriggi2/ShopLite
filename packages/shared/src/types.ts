export type UserRole = 'USER' | 'ADMIN';

export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  priceCents: number;
  createdAt: string;
}
