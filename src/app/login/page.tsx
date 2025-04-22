'use client';
import { signInWithGoogle } from '@/app/lib/actions/auth';
import { FaCheck, FaGoogle } from 'react-icons/fa';
import styles from './page.module.scss';
import { PulseLoader } from 'react-spinners';
import { useTransition } from 'react';

export default function LoginPage() {
  const [isPending, startTransition] = useTransition();
  const handleSignIn = () => {
    startTransition(() => signInWithGoogle());
  };
  return (
    <section className={styles['login-section']}>
      <div className={styles['login-container']}>
        <div className={styles['login-container-header']}>
          <div className={`${styles['app-icon']} ${styles['bg']}`}>
            <div className={`${styles['app-icon']} ${styles['front']}`}>
              <FaCheck size={30} color="#a492c6" />
            </div>
          </div>
          <h1 className={styles['app-title']}>Neuma TODO</h1>
        </div>
        <div className={styles['welcome-text']}>
          ようこそ！
          <br />
          サインインしてはじめよう！
        </div>
        <button
          type="button"
          onClick={handleSignIn}
          className={styles['sign-in-btn']}
          disabled={isPending}
        >
          <div className={styles['inner-wrapper']}>
            <FaGoogle size={24} color="#7134eb" aria-hidden />
            <span>Sign in with Google</span>
          </div>
          {isPending && (
            <PulseLoader
              className={styles['loader']}
              loading={true}
              size={10}
              color={`#7134eb`}
            />
          )}
        </button>
      </div>
    </section>
  );
}
