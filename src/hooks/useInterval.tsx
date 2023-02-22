import { useEffect } from 'react';

// /** @param {() => void} callback */

export const interval = (delay = 0) => (
  callback: () => void
) =>
  useEffect(() => {
    const id = setInterval(callback, delay);

    return () => clearInterval(id);
  }, [callback]);
