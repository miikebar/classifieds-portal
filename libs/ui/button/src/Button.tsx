import type {
  PolymorphicForwardRefExoticComponent,
  PolymorphicPropsWithoutRef,
  PolymorphicPropsWithRef,
} from 'react-polymorphic-types';
import React, { ComponentPropsWithoutRef } from 'react';
import { Spinner } from '@listic/ui/spinner';
import cs from 'classnames';

const ButtonDefaultElement = 'button';

export interface ButtonOwnProps extends ComponentPropsWithoutRef<'button'> {
  isDisabled?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  variant?: 'primary' | 'ghost';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export type ButtonProps<
  T extends React.ElementType = typeof ButtonDefaultElement
> = PolymorphicPropsWithRef<ButtonOwnProps, T>;

export const Button: PolymorphicForwardRefExoticComponent<
  ButtonOwnProps,
  typeof ButtonDefaultElement
> = React.forwardRef(function Button<
  T extends React.ElementType = typeof ButtonDefaultElement
>(
  {
    as,
    isDisabled,
    isLoading,
    loadingText,
    variant = 'primary',
    leftIcon,
    rightIcon,
    className = '',
    children,
    ...restProps
  }: PolymorphicPropsWithoutRef<ButtonOwnProps, T>,
  ref: React.ForwardedRef<Element>
) {
  const Element: React.ElementType = as || ButtonDefaultElement;

  const renderContent = () => {
    return (
      <span
        className={cs({
          invisible: isLoading,
        })}
      >
        {leftIcon && <span>{leftIcon}</span>}
        {children}
        {rightIcon && <span>{rightIcon}</span>}
      </span>
    );
  };

  const renderSpinner = () => {
    return (
      <span
        className={cs({
          'absolute left-0 right-0 grid place-items-center': !loadingText,
          'mr-3': !!loadingText,
        })}
      >
        <Spinner />
      </span>
    );
  };

  return (
    <Element
      ref={ref}
      className={cs({
        [className]: true,
        [ghostClasses]: variant === 'ghost',
        [primaryClasses]: variant === 'primary',
        [disabledClasses]: isLoading || isDisabled,
        [baseClasses]: true,
      })}
      disabled={isLoading || isDisabled}
      {...restProps}
    >
      {isLoading && renderSpinner()}
      {(isLoading && loadingText) || renderContent()}
    </Element>
  );
});

const baseClasses =
  'relative inline-flex justify-center items-center py-2 px-4 rounded-md font-medium transition-colors';
const primaryClasses = 'bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-200';
const ghostClasses = 'hover:bg-gray-100 active:bg-gray-200';
const disabledClasses = 'opacity-50 cursor-not-allowed';
