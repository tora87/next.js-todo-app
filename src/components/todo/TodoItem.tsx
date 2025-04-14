'use client';

import { useState } from 'react';
import { Todo } from '@prisma/client';
import { FaTrash } from 'react-icons/fa6';
import styles from './TodoItem.module.scss';
import { deleteTodoAction } from '@/app/lib/actions';

type Props = {
  todo: Todo;
};

export default function TodoItem({ todo }: Props) {
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  const handleDelete = async (id: number) => {
    try {
      setIsDeleted(true);
      setTimeout(async () => {
        await deleteTodoAction(id);
      }, 300);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteClass = () => {
    return isDeleted ? styles['delete'] : '';
  };

  return (
    <li className={`${styles['todo-item']} ${deleteClass()}`}>
      <span>{todo.title}</span>
      <div className="button-group">
        <button
          onClick={() => handleDelete(todo.id)}
          className="delete-btn"
          type="button"
        >
          <FaTrash color="#ff7b7b" size={'20px'} />
        </button>
      </div>
    </li>
  );
}
