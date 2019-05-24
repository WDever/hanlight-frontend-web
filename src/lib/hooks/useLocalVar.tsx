import * as React from 'react';

const { useRef, useCallback } = React;

export function useLocalVar<T>(defaultVales: T) {
  const state = useRef<T>(defaultVales);
  // const setState = useCallback((value: T) => {
  //   state.current = value;
  // }, []);
  const setState = (value: T) => {
    state.current = value;
  };

  return [state.current, setState] as [T, typeof setState];
}
