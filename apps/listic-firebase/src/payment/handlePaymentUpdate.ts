import { Collection, Region } from '@listic/core-firebase-utils';
import { Product } from '@listic/core-payment';
import { Offer } from '@listic/feature-offer-types';
import * as functions from 'firebase-functions';
import Stripe from 'stripe';
import { admin } from '../lib/firebase';
import { add } from 'date-fns';

const API_KEY = functions.config().stripe.api_key;
const ENDPOINT_SECRET = functions.config().stripe.endpoint_secret;

const stripe = new Stripe(API_KEY, {
  apiVersion: '2020-08-27',
  appInfo: {
    name: 'listic',
  },
  typescript: true,
});

export const handlePaymentUpdate = functions
  .region(Region.DEFAULT)
  .https.onRequest(async (req, res) => {
    const payload = req.rawBody;
    const sig = req.header('stripe-signature');

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(payload, sig, ENDPOINT_SECRET);
    } catch (err) {
      console.error(err);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    console.log('hello');

    switch (event.type) {
      case 'checkout.session.completed':
        await enableOfferPromoting(
          (event.data.object as any).metadata.offerId,
          (event.data.object as any).metadata.product
        );
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.status(200).send();
  });

const enableOfferPromoting = async (offerId: string, product: Product) => {
  const offer = admin.firestore().collection(Collection.OFFERS).doc(offerId);
  await offer.update({
    isPromoted: true,
    promoteExpires: add(new Date(), {
      days: product === Product.PROMOTE_7_DAYS ? 7 : 30,
    }),
  } as Pick<Offer, 'isPromoted' | 'promoteExpires'>);
};
