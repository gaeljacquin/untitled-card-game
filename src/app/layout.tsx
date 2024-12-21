import type { Metadata } from 'next';
import { Saira } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';

import './globals.css';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import appinfo from '@/utils/appinfo';

const sairaInit = Saira({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
});

const sairaVariable = 'font-saira';
const saira = sairaInit.className + ' ' + sairaVariable;

export const metadata: Metadata = {
  title: appinfo.title,
  description: appinfo.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={saira + ' antialiased'}>
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
