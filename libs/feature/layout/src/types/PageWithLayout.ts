import { NextPage } from 'next';
import React from 'react';

export type PageWithLayout<P = Record<string, unknown>> = NextPage<P> & {
  getLayout(page: React.ReactNode): React.ReactNode;
};
