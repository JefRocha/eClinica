import { getTranslations } from 'next-intl/server';

import { CTA } from '@/templates/CTA';
import { DemoBanner } from '@/templates/DemoBanner';
import { FAQ } from '@/templates/FAQ';
import { Features } from '@/templates/Features';
import { Footer } from '@/templates/Footer';
import { Hero } from '@/templates/Hero';
import { Navbar } from '@/templates/Navbar';
import { Pricing } from '@/templates/Pricing';
import { Sponsors } from '@/templates/Sponsors';

export async function generateMetadata({
  params,                              // 👈 é Promise
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;     // ✅ aguarde primeiro

  const t = await getTranslations({ locale, namespace: 'Dashboard' });
   return {
     title: t('meta_title'),
   };
 }

export default async function IndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;                      // ⬅️ espera primeiro
  const t = await getTranslations({ locale, namespace: 'Dashboard' });

  return (
    <>
      {/* se precisar de strings:  <h1>{t('welcome')}</h1> */}
      <DemoBanner />
      <Navbar />
      <Hero />
      <Sponsors />
      <Features />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </>
  );
}

