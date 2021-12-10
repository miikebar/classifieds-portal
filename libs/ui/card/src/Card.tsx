import type { PolymorphicPropsWithoutRef } from 'react-polymorphic-types';

export const DefaultElement = 'div';

// eslint-disable-next-line @typescript-eslint/ban-types
export type CardOwnProps = {};

export type CardProps<T extends React.ElementType = typeof DefaultElement> =
  PolymorphicPropsWithoutRef<CardOwnProps, T>;

export function Card<T extends React.ElementType = typeof DefaultElement>({
  as,
  className,
  ...restProps
}: CardProps<T>) {
  const Element: React.ElementType = as || DefaultElement;
  return (
    <Element
      className="bg-white p-4 rounded-lg shadow-sm lg:p-8"
      {...restProps}
    />
  );
}
