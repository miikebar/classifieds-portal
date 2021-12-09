import { object, string, optional } from 'superstruct';

export const SignUpSchema = object({
  name: string(),
  surname: string(),
  phone: optional(string()),
});
