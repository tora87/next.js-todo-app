'use client';

import { useState } from 'react';
import { addTodoAction } from '@/app/lib/actions';
import { FaPlus } from 'react-icons/fa6';
import styles from './AddTodoInput.module.scss';

export default function AddTodoInput() {
  const [inputTitle, setInputTitle] = useState<string>('');

  const handleAdd = async () => {
    if (inputTitle.trim() === '') return;

    try {
      setInputTitle('');
      await addTodoAction(inputTitle);
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

  return (
    <div className={styles['add-todo-wrapper']}>
      <input
        type="text"
        className={styles['add-todo']}
        value={inputTitle}
        placeholder="Add Task"
        onChange={(e) => setInputTitle(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button type="button" className={styles['add-btn']} onClick={handleAdd}>
        <FaPlus color="#120030" size={'20px'} />
        <span>Add</span>
      </button>
    </div>
  );
}
