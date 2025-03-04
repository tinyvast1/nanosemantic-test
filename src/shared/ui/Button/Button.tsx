import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react';
import IconLoader from '@/shared/assets/loader.svg';
import styles from './style.module.css';
import clsx from 'clsx';

export enum EButtonVariant {
  OUTLINE = 'OUTLINE',
  FIELD = 'FIELD',
}

interface IButtonProps
  extends PropsWithChildren,
    ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: EButtonVariant;
}

const Button: FC<IButtonProps> = (props) => {
  const {
    className,
    loading = false,
    variant = EButtonVariant.OUTLINE,
    children,
    ...restProps
  } = props;
  return (
    <button
      data-variant={variant}
      className={clsx(styles.button, className)}
      {...restProps}
    >
      {loading ? <img width={30} src={IconLoader} /> : children}
    </button>
  );
};

export default Button;

