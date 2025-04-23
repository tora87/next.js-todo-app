'use client';
import React, { useEffect, useState } from 'react';
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
  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /iphone|ipad|android/.test(userAgent);
    setIsMobile(isMobile);
  }, []);

  return (
    <div className={styles['tooltip-wrapper']}>
      {children}
      {!isMobile && (
        <div className={`${styles['tooltip']} ${styles[position]}`}>{text}</div>
      )}
    </div>
  );
};

export default Tooltip;
