'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Todo } from '@prisma/client';
import { FaTrash, FaPen, FaCheck, FaBan } from 'react-icons/fa6';
import styles from './TodoItem.module.scss';
import { deleteTodoAction, updateTodoAction } from '@/app/lib/actions';
import Tooltip from '@/components/common/Tooltip';

type Props = {
  todo: Todo;
};

export default function TodoItem({ todo }: Props) {
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>(todo.title);
  const [isDone, setIsDone] = useState<boolean>(todo.is_done);
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
      if (isEditing) {
        if (editedTitle.trim() !== '') {
          await updateTodoAction({ id: todo.id, title: editedTitle });
          setIsEditing(false);
        } else {
          cancelEdit();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateIsDone = async () => {
    setIsDone((prev) => !prev);
    await updateTodoAction({ id: todo.id, is_done: !isDone });
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
    <li
      className={`${styles['todo-item']} ${deleteClass()} ${isDone && styles['checked']}`}
    >
      <div className="is-done-wrapper">
        <Tooltip text={isDone ? '完了' : '未完了'} position="bottom">
          <button
            type="button"
            aria-label={isEditing ? '完了である' : '未完了である'}
            className={`${styles['is-done-box']} ${isDone && styles['checked']}`}
            onClick={handleUpdateIsDone}
          >
            <FaCheck
              color={`${isDone ? '#7134eb' : '#afa7bf'}`}
              size={'20px'}
              aria-hidden
            />
          </button>
        </Tooltip>
      </div>
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          name="title"
          className={`${styles['todo-title']} ${styles['input']}`}
          placeholder={todo.title}
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <span className={styles['todo-title']}>{todo.title}</span>
      )}
      <div className={styles['button-group']}>
        <Tooltip text={isEditing ? '更新' : '編集'} position="bottom">
          <button
            onClick={
              isEditing ? () => handleUpdate(todo.id) : () => setIsEditing(true)
            }
            className="edit-btn"
            type="button"
          >
            {isEditing ? (
              <FaCheck color="#a485db" size={'20px'} aria-hidden />
            ) : (
              <FaPen color="#a485db" size={'20px'} aria-hidden />
            )}
          </button>
        </Tooltip>
        <Tooltip text={isEditing ? '編集中止' : '削除'} position="bottom">
          <button
            onClick={isEditing ? cancelEdit : () => handleDelete(todo.id)}
            className="delete-btn"
            type="button"
          >
            {isEditing ? (
              <FaBan color="#ff7b7b" size={'20px'} aria-hidden />
            ) : (
              <FaTrash color="#ff7b7b" size={'20px'} aria-hidden />
            )}
          </button>
        </Tooltip>
      </div>
    </li>
  );
}
