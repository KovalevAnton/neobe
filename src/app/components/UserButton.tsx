'use client';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function UserButton() {
  const { data: session, status } = useSession();

  function getFirstTwoCapitalLetters(str?: string | null) {
    const match = (str || '').match(/[A-Z]/g);
    return match ? match.slice(0, 2).join('') : 'GT';
  }

  return (
    <div>
      {status === 'authenticated' && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              {/* eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain */}
              <AvatarImage src={session?.user?.image!} />
              <AvatarFallback>
                {getFirstTwoCapitalLetters(session?.user?.name)}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => {
                signOut();
              }}
            >
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      {status === 'unauthenticated' && (
        <Button onClick={() => signIn()}>Sign in</Button>
      )}
    </div>
  );
}
