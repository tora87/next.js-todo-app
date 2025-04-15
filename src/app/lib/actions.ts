'use server';

import { Todo } from '@prisma/client';
import { prisma } from './prisma';
import { revalidatePath } from 'next/cache';

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
