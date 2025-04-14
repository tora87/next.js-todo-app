'use server';

import { prisma } from './prisma';
import { revalidatePath } from 'next/cache';

export const addTodoAction = async (title: string) => {
  // const title = formData.get('title') as string;
  // const priority = formData.get('priority');

  await prisma.todo.create({ data: { title } });

  revalidatePath('/');
};

export const updateTodoAction = async () => {};

export const deleteTodoAction = async (id: number) => {
  await prisma.todo.delete({
    where: { id: Number(id) },
  });

  revalidatePath('/');
};
