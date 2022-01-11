import { Function } from '@listic/core-firebase-utils';
import {
  CreateCheckoutSessionRequestData,
  CreateCheckoutSessionResponseData,
} from '@listic/core-payment';
import { useFirebaseFunction } from '@listic/react/firebase/functions';

export const useCreateCheckoutSession = () => {
  return useFirebaseFunction<
    CreateCheckoutSessionRequestData,
    CreateCheckoutSessionResponseData
  >(Function.PAYMENT.CREATE_CHECKOUT_SESSION);
};
