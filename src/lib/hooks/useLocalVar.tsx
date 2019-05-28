import * as React from 'react';

const { useRef, useCallback } = React;

export function useLocalVar<T>(defaultValues: T) {
  const state = useRef<T>(defaultValues);

  const setState = useCallback(async (value: T) => {
    state.current = value;
  }, []);
  // const setState = async (value: T) => {
  //   state.current = value;
  // };

  return [state.current, setState] as [T, typeof setState];
}
