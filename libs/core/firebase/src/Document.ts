import { Collection } from './Collection';

export const Document = {
  forUser: (userId: string) => ({
    USER_PROFILE: `${Collection.USERS}/${userId}`,
  }),
};
