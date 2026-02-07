import { useState, useRef, useCallback, useEffect } from 'react';

export function useResizableSplit(initialPercent = 45) {
  const [splitPercent, setSplitPercent] = useState(initialPercent);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setSplitPercent(Math.min(Math.max(((e.clientX - rect.left) / rect.width) * 100, 20), 80));
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  }, []);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  const startDrag = () => {
    isDragging.current = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  };

  return { splitPercent, containerRef, startDrag };
}
