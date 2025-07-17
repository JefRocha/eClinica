import { fileURLToPath } from 'node:url';

import withBundleAnalyzer from '@next/bundle-analyzer';
import { withSentryConfig } from '@sentry/nextjs';
import createJiti from 'jiti';
import withNextIntl from 'next-intl/plugin';

// ────────────────────────────────────────────────────────────
// Bootstrap das variáveis de ambiente (usa jiti para ESM-CJS)
const jiti = createJiti(fileURLToPath(import.meta.url));
jiti('./src/libs/Env');          // carrega .env via zod/env loader

// ────────────────────────────────────────────────────────────
// Plugins de composição (Bundle Analyzer + next-intl)
const withNextIntlConfig = withNextIntl('./src/libs/i18n.ts');
const bundleAnalyzer     = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

// ────────────────────────────────────────────────────────────
// Configuração Next.js principal
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { dirs: ['.'] },
  poweredByHeader: false,
  reactStrictMode: true,

  // ✅ agora é estável, fica fora de `experimental`
  serverExternalPackages: ['@electric-sql/pglite'],

  //experimental: {
  //  clientTraceMetadata: true,    // mantenha somente flags que ainda são experimentais
  //},
};

// ────────────────────────────────────────────────────────────
// Configuração Sentry (envolve todo o config final)
export default withSentryConfig(
  bundleAnalyzer(withNextIntlConfig(nextConfig)),
  {
    org: 'nextjs-boilerplate-org',      // TODO: ajuste para sua org
    project: 'nextjs-boilerplate',      // TODO: ajuste para seu projeto
    silent: !process.env.CI,
    widenClientFileUpload: true,
    tunnelRoute: '/monitoring',
    hideSourceMaps: true,
    disableLogger: true,
    automaticVercelMonitors: true,
    telemetry: false,
  },
);
