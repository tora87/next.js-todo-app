import type { Metadata } from 'next';
import { M_PLUS_Rounded_1c } from 'next/font/google';
import Header from '@/components/common/Header';
import '../styles/globals.scss';

const font_MPR = M_PLUS_Rounded_1c({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Neuma TODO',
  description:
    'This is a TODO web application designed with a neumorphic style.',
  openGraph: {
    type: 'website',
    title: 'Neuma TODO',
    siteName: 'Neuma TODO',
    url: 'https://neuma-todo-stg.vercel.app',
    description:
      'This is a TODO web application designed with a neumorphic style.',
    images: {
      url: '/ogp/neuma_todo_thumbnail.png',
      type: 'image/png',
      width: 1200,
      height: 700,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${font_MPR.className}`}>
        <Header />
        <main>
          <div className="contents-wrapper">{children}</div>
        </main>
      </body>
    </html>
  );
}
