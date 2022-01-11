import { Region } from '@listic/core-firebase-utils';
import {
  CreateCheckoutSessionRequestData,
  CreateCheckoutSessionResponseData,
  Product,
} from '@listic/core-payment';
import * as functions from 'firebase-functions';
import { authGuard } from '../utils/authGuard';
import Stripe from 'stripe';

const APP_DOMAIN = functions.config().app.domain;
const API_KEY = functions.config().stripe.api_key;
const PRICE_7_DAYS = functions.config().stripe.prices.promote_7_days;
const PRICE_30_DAYS = functions.config().stripe.prices.promote_30_days;

const stripe = new Stripe(API_KEY, {
  apiVersion: '2020-08-27',
  appInfo: {
    name: 'listic',
  },
  typescript: true,
});

export const createCheckoutSession = functions
  .region(Region.DEFAULT)
  .https.onCall(
    async (
      { product, offerId }: CreateCheckoutSessionRequestData,
      ctx
    ): Promise<CreateCheckoutSessionResponseData> => {
      authGuard(ctx);

      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price:
              product === Product.PROMOTE_7_DAYS ? PRICE_7_DAYS : PRICE_30_DAYS,
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${APP_DOMAIN}/offer?success=true`,
        cancel_url: `${APP_DOMAIN}/offer?canceled=true`,
        metadata: { offerId, product },
      });

      return { redirect: session.url };
    }
  );
