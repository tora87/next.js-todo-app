import type { Metadata } from 'next';
import { M_PLUS_Rounded_1c } from 'next/font/google';
import './globals.scss';

const font_MPR = M_PLUS_Rounded_1c({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Neumor TODO',
  description: 'This is Neumor-TODO',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${font_MPR.className}`}>
        <div className="contents-wrapper">{children}</div>
      </body>
    </html>
  );
}
