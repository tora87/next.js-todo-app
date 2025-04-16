'use client';
import React from 'react';
import styles from './Tooltip.module.scss';

type TooltipProps = {
  children: React.ReactNode;
  text: string;
  position: Position;
};

type Position = 'top' | 'bottom' | 'right' | 'left';

const Tooltip: React.FC<TooltipProps> = ({
  children,
  text,
  position = 'top',
}) => {
  return (
    <div className={styles['tooltip-wrapper']}>
      {children}
      <div className={`${styles['tooltip']} ${styles[position]}`}>{text}</div>
    </div>
  );
};

export default Tooltip;
