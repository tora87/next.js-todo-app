'use client';

import { createClient } from '@/app/lib/supabase/client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { signOut } from '@/app/lib/actions/auth';
import Image from 'next/image';
import { UserMetadata, Session } from '@supabase/supabase-js';
import styles from './Header.module.scss';

export default function Header() {
  const [session, setSession] = useState<Session | null>(null);
  const pathname = usePathname();
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
    };
    getUser();
  }, []);

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
          onClick={signOut}
        >
          Sign out
        </button>
      </div>
    </header>
  );
}
