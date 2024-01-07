import { ReactNode } from 'react';
import Link from 'next/link';

const ErrorSection = ({ errorMessage }: { errorMessage: string }): ReactNode => {
  return (
    <div className="mb-10 bg-white w-1/4 rounded text-center py-5 dark:bg-white/10 dark:text-white/80">
      <div className="text-red-500 mb-3 dark:text-white">{errorMessage}</div>
      <Link target="_blank" href="https://github.com/usmantahirr/usmantahir.com/issues/new"
            className="border border-gray-300 px-3 py-1 hover:shadow-md rounded text-sm dark:text-white/80">
        Let me know?
      </Link>
    </div>
  );
};

export default ErrorSection;