import styles from './TodoList.module.scss';
import { Todo } from '@prisma/client';
import TodoItem from './TodoItem';
import { prisma } from '@/app/lib/prisma';

export default async function TodoList() {
  const todos: Todo[] = await prisma.todo.findMany({
    orderBy: {
      id: 'desc',
    },
  });

  return (
    <ul className={styles['todo-items']}>
      {todos.map((todo) => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </ul>
  );
}
