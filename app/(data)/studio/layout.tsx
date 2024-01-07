import { ReactNode } from 'react';

export const metadata = {
  title: 'Dashboard',
  description: 'Dashboard for UsmanTahir.com',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
