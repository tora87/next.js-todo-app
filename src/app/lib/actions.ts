'use server';

import { Todo } from '@prisma/client';
import { prisma } from './prisma';
import { revalidatePath } from 'next/cache';

export const addTodoAction = async (title: string) => {
  // const title = formData.get('title') as string;
  // const priority = formData.get('priority');

  await prisma.todo.create({ data: { title } });

  revalidatePath('/');
};

type Test = {
  id: number;
  name: string;
  ishoge: boolean;
};

export const updateTodoAction = async (
  id: number,
  title: string,
  priority: number = 1,
  is_done = false
) => {
  await prisma.todo.update({
    where: {
      id: Number(id),
    },
    data: {
      title,
      priority,
      is_done,
    },
  });

  revalidatePath('/');
};

export const deleteTodoAction = async (id: number) => {
  await prisma.todo.delete({
    where: { id: Number(id) },
  });

  revalidatePath('/');
};
