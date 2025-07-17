// middleware.ts  (raiz do projeto)
import { NextResponse, type NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';   // ← aqui

const intlMiddleware = createIntlMiddleware({
  locales: ['pt-BR', 'en', 'fr'],
  defaultLocale: 'pt-BR',
  localePrefix: 'as-needed'
});

export default function middleware(req: NextRequest) {
  // redireciona "/" → "/pt-BR"
  if (new URL(req.url).pathname === '/') {
    return NextResponse.redirect(new URL('/pt-BR', req.url));
  }

  // aplica i18n às demais rotas
  return intlMiddleware(req);
}

/* faz o middleware rodar em todas as rotas do App Router */
export const config = {
  matcher: ['/((?!_next|.*\\..*).*)']
};
