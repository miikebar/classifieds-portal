import { Product } from './Product';

export interface CreateCheckoutSessionRequestData {
  product: Product;
  offerId: string;
}
