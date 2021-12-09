import React from 'react';

type IdContextValue = {
  prefix: number;
  current: number;
};

const defaultIdContext: IdContextValue = {
  prefix: Math.round(Math.random() * 10000000000),
  current: 0,
};

const IdContext = React.createContext<IdContextValue>(defaultIdContext);

export const IdProvider: React.FC = React.memo(({ children }) => {
  const currentContext = React.useContext(IdContext);
  const isRoot = currentContext === defaultIdContext;
  const context: IdContextValue = React.useMemo(
    () => ({
      prefix: isRoot ? 0 : ++currentContext.prefix,
      current: 0,
    }),
    [isRoot, currentContext]
  );

  return React.createElement(IdContext.Provider, { value: context }, children);
});

export function useId(idProp?: string, prefix?: string): string {
  const context = React.useContext(IdContext);
  return React.useMemo(
    () =>
      idProp ||
      [prefix, context.prefix, ++context.current].filter(Boolean).join('-'),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [idProp, prefix]
  );
}
