import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import ResponsiveLayout from '@/app/utils/ResponsiveLayout';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Super Task',
  description: 'Manage your task with super fast effiecieny',
  icons:
    'https://mir-s3-cdn-cf.behance.net/project_modules/disp/22a3ab16269821.562a8602153f7.png',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ResponsiveLayout>{children}</ResponsiveLayout>
      </body>
    </html>
  );
}
