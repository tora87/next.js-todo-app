import styles from './TodoList.module.scss';
import { Todo } from '@prisma/client';
import TodoItem from './TodoItem';
import { getTodosAction } from '@/app/lib/actions/todo';

export default async function TodoList() {
  const todos: Todo[] = await getTodosAction();

  if (!todos.length) {
    return (
      <div className={styles['no-item-wrapper']}>
        <div className={styles['no-item-message']}>
          Todoはまだありません...
          <br />
          追加してみましょう！
        </div>
      </div>
    );
  }

  return (
    <ul className={styles['todo-items']}>
      {todos.map((todo) => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </ul>
  );
}
