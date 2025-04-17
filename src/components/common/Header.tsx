'use client';

import { createClient } from '@/app/lib/supabase/client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { signOut } from '@/app/lib/actions';
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
        <Image
          className={styles['avatar']}
          src={userMetadata.avatar_url}
          width={36}
          height={36}
          alt="アバター画像"
        />
        <button
          type="button"
          className={styles['sign-out-btn']}
          onClick={signOut}
        >
          Sign Out
        </button>
      </div>
    </header>
  );
}
