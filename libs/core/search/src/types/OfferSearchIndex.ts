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
  isPromoted?: boolean;
  owner: {
    id: string;
    name: string;
    surname: string;
    phone?: string;
    createdAt: number;
  };
}
