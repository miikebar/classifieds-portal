import * as React from 'react';
import type {
  PolymorphicForwardRefExoticComponent,
  PolymorphicPropsWithoutRef,
  PolymorphicPropsWithRef,
} from 'react-polymorphic-types';

export const DefaultElement = 'div';

// eslint-disable-next-line @typescript-eslint/ban-types
export type CardOwnProps = {};

export type CardProps<T extends React.ElementType = typeof DefaultElement> =
  PolymorphicPropsWithRef<CardOwnProps, T>;

export const Card: PolymorphicForwardRefExoticComponent<
  CardOwnProps,
  typeof DefaultElement
> = React.forwardRef(function Card<
  T extends React.ElementType = typeof DefaultElement
>(
  {
    as,
    className = '',
    ...restProps
  }: PolymorphicPropsWithoutRef<CardOwnProps, T>,
  ref: React.ForwardedRef<Element>
) {
  const Element: React.ElementType = as || DefaultElement;
  return (
    <Element
      ref={ref}
      className="bg-white p-4 rounded-lg shadow-sm lg:p-8"
      {...restProps}
    />
  );
});
