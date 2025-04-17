'use client';
import { loginWithGoogle } from '../lib/actions';

export default function LoginPage() {
  return (
    <>
      <h1>ログインページ</h1>
      <button type="button" onClick={loginWithGoogle}>
        Sign In
      </button>
    </>
  );
}
