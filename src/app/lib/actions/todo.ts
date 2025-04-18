'use server';

import { Todo } from '@prisma/client';
import { prisma } from '../prisma';
import { revalidatePath } from 'next/cache';
import { getCurrentUser } from './auth';

export const getTodosAction = async () => {
  const user = await getCurrentUser();

  const todos = await prisma.todo.findMany({
    where: {
      user_id: user.id,
    },
    orderBy: [{ is_done: 'asc' }, { id: 'desc' }],
  });

  return todos;
};

export const addTodoAction = async (title: string) => {
  const user = await getCurrentUser();
  await prisma.todo.create({ data: { title, user_id: user.id } });

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
