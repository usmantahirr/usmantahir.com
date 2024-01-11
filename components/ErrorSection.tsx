import { ReactNode } from "react";
import Link from "next/link";

const ErrorSection = ({ errorMessage }: { errorMessage: string }): ReactNode => {
  return (
    <div className="mb-10 w-1/4 rounded bg-white py-5 text-center dark:bg-white/10 dark:text-white/80">
      <div className="mb-3 text-red-500 dark:text-white">{errorMessage}</div>
      <Link
        target="_blank"
        href="https://github.com/usmantahirr/usmantahir.com/issues/new"
        className="rounded border border-gray-300 px-3 py-1 text-sm hover:shadow-md dark:text-white/80"
      >
        Let me know?
      </Link>
    </div>
  );
};

export default ErrorSection;
