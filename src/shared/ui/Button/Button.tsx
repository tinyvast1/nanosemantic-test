import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react';
import IconLoader from '@/shared/assets/loader.svg';
import styles from './style.module.css';
import clsx from 'clsx';

interface IButtonProps
  extends PropsWithChildren,
    ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const Button: FC<IButtonProps> = (props) => {
  const { className, loading = false, children, ...restProps } = props;
  return (
    <button className={clsx(styles.button, className)} {...restProps}>
      {loading ? <img width={30} src={IconLoader} /> : children}
    </button>
  );
};

export default Button;
