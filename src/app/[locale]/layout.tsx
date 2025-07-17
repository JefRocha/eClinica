import '@/styles/global.css';

import type { Metadata } from 'next';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { DemoBadge } from '@/components/DemoBadge';
import { AllLocales } from '@/utils/AppConfig';

// ──────────────────────────────────────────────
// SEO genérico; pode ficar como estava
export const metadata: Metadata = { /* …icons… */ };

// gera rotas estáticas p/ SSG
export function generateStaticParams() {
  return AllLocales.map(locale => ({ locale }));
}

// ──────────────────────────────────────────────
// Layout por idioma
export default async function LocaleLayout({
  children,
  params,                          // virou Promise no Next 15
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // valida locale
  if (!hasLocale(AllLocales, locale)) {
    notFound();
  }

  // informa ao next-intl qual idioma resolver
  setRequestLocale(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className="bg-background text-foreground antialiased"
        suppressHydrationWarning
      >
        {/* O plugin next-intl já injeta as mensagens automaticamente */}
        <NextIntlClientProvider>
          {children}
          <DemoBadge />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
