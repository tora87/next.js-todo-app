import styles from './page.module.scss';
import AddTodoInput from '@/features/todo/AddTodoInput';
import TodoList from '@/components/todo/TodoList';

export default function Home() {
  return (
    <>
      <div className="container">
        <h1 className={styles.title}>Neuma TODO</h1>
        <AddTodoInput />
        <TodoList />
      </div>
    </>
  );
}
