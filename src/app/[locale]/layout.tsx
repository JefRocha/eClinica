// src/app/[locale]/layout.tsx
import '@/styles/global.css'
import { ReactNode } from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

import { AllLocales } from '@/utils/AppConfig'

// Gera /pt-BR, /en, /fr…
export function generateStaticParams() {
  return AllLocales.map((locale) => ({ locale }))
}

// Metadados genéricos (favicon, etc). Se quiser i18n também aqui, use generateMetadata.
export const metadata: Metadata = {
  // … seu <head> estático …
}

export default async function LocaleLayout({
  children,
  params,             // já sincronizado aqui
}: {
  children: ReactNode
  params: { locale: string }
}) {
  const { locale } = params

  // Se vier outro idioma, 404
  if (!AllLocales.includes(locale)) {
    notFound()
  }

  // Carrega as mensagens geradas pelo plugin next-intl
  const messages = await getMessages(locale)

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
