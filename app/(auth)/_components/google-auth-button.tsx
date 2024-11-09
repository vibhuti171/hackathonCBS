'use client';

import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';

import  { MailIcon } from "lucide-react";

export default function GoogleSignInButton() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  return (
    <Button
      className="w-full"
      variant="outline"
      type="button"
      onClick={() =>
        signIn('google', { callbackUrl: callbackUrl ?? '/dashboard' })
      }
    >
       <MailIcon className="w-5 h-5 mr-2 text-red-500" />
      Continue with Google
    </Button>
  );
}
