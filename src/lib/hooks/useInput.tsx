import * as React from 'react';

const { useState, useCallback } = React;

export function useInput(initialValue: string) {
  const [input, setInput] = useState(initialValue);
  const inputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }, []);
  return [input, inputChange] as [string, typeof inputChange];
}
