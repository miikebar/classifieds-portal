import { email } from '@listic/core/schema';
import { Infer, object, size, string } from 'superstruct';

export const SignInSchema = object({
  email: email(),
  password: size(string(), 6, Infinity),
});

export type SignInData = Infer<typeof SignInSchema>;
