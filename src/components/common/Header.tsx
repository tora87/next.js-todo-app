'use client';

import { createClient } from '@/app/lib/supabase/client';
import { useEffect, useState, useTransition } from 'react';
import { usePathname } from 'next/navigation';
import { signOut } from '@/app/lib/actions/auth';
import Image from 'next/image';
import { UserMetadata, Session } from '@supabase/supabase-js';
import styles from './Header.module.scss';
import { PulseLoader } from 'react-spinners';

export default function Header() {
  const [session, setSession] = useState<Session | null>(null);
  const pathname = usePathname();
  const supabase = createClient();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
    };
    getUser();
  }, []);

  const handleSignOut = async () => {
    startTransition(() => signOut());
  };

  if (pathname === '/login' || !session?.user) {
    return null;
  }

  const userMetadata: UserMetadata = session.user.user_metadata;

  return (
    <header>
      <div className={styles['header-container']}>
        <div className={styles['avatar-wrapper']}>
          <Image
            className={styles['avatar']}
            src={userMetadata.avatar_url}
            fill
            alt="アバター画像"
          />
        </div>
        <button
          type="button"
          className={styles['sign-out-btn']}
          onClick={handleSignOut}
          disabled={isPending}
        >
          <span>Sign out</span>
          {isPending && (
            <PulseLoader
              className={styles['loader']}
              loading={isPending}
              size={6}
              color={`#7134eb`}
            />
          )}
        </button>
      </div>
    </header>
  );
}
