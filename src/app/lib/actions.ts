'use server';

import { Todo } from '@prisma/client';
import { prisma } from './prisma';
import { revalidatePath } from 'next/cache';
import { createClient } from './supabase/server';
import { redirect } from 'next/navigation';

export const addTodoAction = async (title: string) => {
  await prisma.todo.create({ data: { title } });

  revalidatePath('/');
};

type UpdateTodoPayload = {
  id: number;
} & Partial<Omit<Todo, 'id' | 'updated_at'>>;

export const updateTodoAction = async (payload: UpdateTodoPayload) => {
  const { id, ...data } = payload;
  await prisma.todo.update({
    where: {
      id: Number(id),
    },
    data,
  });

  revalidatePath('/');
};

export const deleteTodoAction = async (id: number) => {
  await prisma.todo.delete({
    where: { id: Number(id) },
  });

  revalidatePath('/');
};

/**
 * Auth
 */
export const loginWithGoogle = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'http://localhost:3000/auth/callback',
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  });

  if (error) {
    console.error('Error logging in with Google:', error);
    return;
  }

  if (data.url) {
    redirect(data.url);
  }
};

export const signOut = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/login');
};
