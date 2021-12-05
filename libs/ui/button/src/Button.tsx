import React, { ComponentPropsWithoutRef } from 'react';
import { Spinner } from '@listic/ui/spinner';
import cs from 'classnames';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  isDisabled?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  variant?: 'primary';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      isDisabled,
      isLoading,
      loadingText,
      variant = 'primary',
      leftIcon,
      rightIcon,
      className = '',
      children,
      ...restProps
    },
    ref
  ) => {
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
      <button
        ref={ref}
        className={cs({
          [primaryClasses]: variant === 'primary',
          [disabledClasses]: isLoading || isDisabled,
          [baseClasses]: true,
        })}
        disabled={isLoading || isDisabled}
        {...restProps}
      >
        {isLoading && renderSpinner()}
        {(isLoading && loadingText) || renderContent()}
      </button>
    );
  }
);

const baseClasses =
  'relative inline-flex justify-center items-center py-2 px-4 rounded-md font-medium transition-colors';
const primaryClasses = 'bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-200';
const disabledClasses = 'opacity-50 cursor-not-allowed';
