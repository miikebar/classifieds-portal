// TODO: use libs after making them buildable
export interface OfferSearchIndex {
  objectID: string;
  name: string;
  category: string;
  description: string;
  price: number;
  active: boolean;
  slug: string;
  createdAt: number;
  updatedAt: number;
  owner: {
    id: string;
    name: string;
    surname: string;
    phone?: string;
    createdAt: number;
  };
}
