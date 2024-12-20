import type { Metadata } from 'next';
import { Saira } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';

import './globals.css';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import appinfo from '@/utils/appinfo';

const saira = Saira({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-saira',
});
const fonts = [saira.variable].join(' ');

export const metadata: Metadata = {
  title: appinfo.title,
  description: appinfo.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={fonts + ' antialiased'}>
        <NextThemesProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">{children}</div>
          <Toaster />
        </NextThemesProvider>
      </body>
    </html>
  );
}
