import { FC, InputHTMLAttributes } from 'react';
import styles from './style.module.css';
import clsx from 'clsx';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input: FC<IInputProps> = (props) => {
  const { className, ...restProps } = props;
  return <input className={clsx(styles.input, className)} {...restProps} />;
};

export default Input;
