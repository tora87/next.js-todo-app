'use client';

import React, { useEffect, useState } from 'react';
import { Todo } from '@prisma/client';
import styles from './page.module.scss';
import { getTodos, addTodo, deleteTodo } from './lib/fetcher';
import { FaPlus, FaTrash } from 'react-icons/fa6';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputTitle, setInputTitle] = useState<string>('');
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const data = await getTodos();
      setTodos(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAdd = async () => {
    if (inputTitle.trim() === '') return;

    try {
      const res = await addTodo(inputTitle);
      if (res.status === 201) {
        setInputTitle('');
        await fetchTodos();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    setDeleteId(id);
    try {
      await deleteTodo(id);
      await fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 文字変換中には反応されないように
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      await handleAdd();
    }
  };

  const deleteClass = (id: number) => {
    return id === deleteId ? 'delete' : '';
  };

  return (
    <>
      <div className="container">
        <h1 className={styles.title}>Neuma TODO</h1>
        <div className="add-todo-wrapper">
          <input
            type="text"
            className="add-todo"
            value={inputTitle}
            placeholder="Add Task"
            onChange={(e) => setInputTitle(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button type="button" className="add-btn" onClick={handleAdd}>
            <FaPlus color="#120030" size={'20px'} />
            <span>Add</span>
          </button>
        </div>
        <ul className="todo-items">
          {todos.map((todo) => (
            <li key={todo.id} className={`todo-item ${deleteClass(todo.id)}`}>
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
          ))}
        </ul>
      </div>
    </>
  );
}
