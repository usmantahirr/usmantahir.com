import Link from "next/link";
import clsx from "clsx";
import { ReactNode } from "react";

interface Props {
  href: string;
  className?: string;
  children: ReactNode;
  circle?: boolean;
  primary?: boolean;
  onClick?: () => void;
}

const Button = ({ href, children, className, circle = false, primary = false }: Props): ReactNode => (
  <Link
    href={href}
    className={
      clsx(
        "flex items-center gap-2 outline-none cursor-pointer borderBlack dark:bg-white/10 dark:text-white/60 hover:shadow-md dark:hover:border-gray-100 hover:border-gray-300",
        circle ? "rounded-full p-4 text-[1.35rem]" : "rounded-full px-7 py-3",
        primary ? "bg-gray-900 text-white" : "bg-white",
        className,
      )
    }
    target="_blank"
  >
    {children}
  </Link>
);

export default Button;