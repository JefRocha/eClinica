'use client';

import { SignUp } from '@clerk/nextjs';

interface SignUpPageProps {
  params: { locale: string };
}

export default function SignUpPage({ params }: SignUpPageProps) {
  // Monta a URL de sign-up sem usar helpers server-side
  const path = `/${params.locale}/sign-up`;
  return <SignUp path={path} />;
}
