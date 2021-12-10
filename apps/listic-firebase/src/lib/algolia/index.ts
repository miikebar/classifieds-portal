import algoliasearch from 'algoliasearch';
import * as functions from 'firebase-functions';

const ALGOLIA_ID = functions.config().algolia.app_id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.admin_key;

export const SEARCH_INDEX = {
  OFFERS: functions.config().algolia.indexes.offers,
};

export const algoliaClient = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
