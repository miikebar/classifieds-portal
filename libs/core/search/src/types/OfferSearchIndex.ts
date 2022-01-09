// TODO: use libs after making them buildable
export interface OfferSearchIndex {
  objectID: string;
  name: string;
  category: string;
  description: string;
  price: number;
  isActive: boolean;
  slug: string;
  createdAt: number;
  updatedAt: number;
  images?: string[];
  owner: {
    id: string;
    name: string;
    surname: string;
    phone?: string;
    createdAt: number;
  };
}
