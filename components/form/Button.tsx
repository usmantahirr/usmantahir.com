import { AnchorHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import clsx from "clsx";

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children?: ReactNode;
  circle?: boolean;
  primary?: boolean;
  onClick?: () => void;
}

const Button = ({
  href,
  children,
  className,
  circle = false,
  primary = false,
  ...rest
}: Props): ReactNode => (
  <Link
    href={href}
    className={clsx(
      "borderBlack flex cursor-pointer items-center gap-2 outline-none hover:border-gray-300 hover:shadow-md dark:bg-white/10 dark:text-white/60 dark:hover:border-gray-100",
      circle ? "rounded-full p-4 text-[1.35rem]" : "rounded-full px-7 py-3",
      primary ? "bg-gray-900 text-white" : "bg-white",
      className
    )}
    {...rest}
  >
    {children}
  </Link>
);

export default Button;
