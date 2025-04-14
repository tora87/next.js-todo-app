'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Todo } from '@prisma/client';
import { FaTrash, FaPen, FaCheck, FaBan } from 'react-icons/fa6';
import styles from './TodoItem.module.scss';
import { deleteTodoAction, updateTodoAction } from '@/app/lib/actions';

type Props = {
  todo: Todo;
};

export default function TodoItem({ todo }: Props) {
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>(todo.title);

  const inputRef = useRef<HTMLInputElement | null>(null);

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

  const handleUpdate = async (id: number) => {
    try {
      // 編集中かどうか
      if (isEditing) {
        if (editedTitle.trim() !== '') {
          await updateTodoAction(id, editedTitle, undefined, false);
          setIsEditing(false);
        } else {
          cancelEdit();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const cancelEdit = () => {
    setEditedTitle(todo.title);
    setIsEditing(false);
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 文字変換中には反応されないように
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      await handleUpdate(todo.id);
    }

    if (e.key === 'Escape') {
      cancelEdit();
    }
  };

  const deleteClass = () => {
    return isDeleted ? styles['delete'] : '';
  };

  return (
    <li className={`${styles['todo-item']} ${deleteClass()}`}>
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          name="title"
          className={styles['todo-title']}
          placeholder={todo.title}
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <span>{todo.title}</span>
      )}
      <div className={styles['button-group']}>
        <button
          onClick={
            isEditing ? () => handleUpdate(todo.id) : () => setIsEditing(true)
          }
          className="edit-btn"
          type="button"
        >
          {isEditing ? (
            <FaCheck color="#a485db" size={'20px'} />
          ) : (
            <FaPen color="#a485db" size={'20px'} />
          )}
        </button>
        <button
          onClick={isEditing ? cancelEdit : () => handleDelete(todo.id)}
          className="delete-btn"
          type="button"
        >
          {isEditing ? (
            <FaBan color="#ff7b7b" size={'20px'} />
          ) : (
            <FaTrash color="#ff7b7b" size={'20px'} />
          )}
        </button>
      </div>
    </li>
  );
}
