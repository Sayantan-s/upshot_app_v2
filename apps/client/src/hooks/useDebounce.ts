import { useEffect, useRef, useState } from 'react';

interface IOptions {
  leading: boolean;
  trailing: boolean;
}
interface Props<T> {
  currentValue: T;
  delay: number;
  options?: IOptions;
}

type IReturnType<T> = [(newValue: T) => void, T];

export const useDebounce = <T>({
  currentValue,
  delay,
  options,
}: Props<T>): IReturnType<T> => {
  const [value, setValue] = useState<T>(currentValue);
  const [debouncedValue, setDebouncedValue] = useState(currentValue);
  const [isFirstInteraction, setIsFirstInteraction] = useState(true);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (options?.leading && !timerRef.current && !isFirstInteraction && value)
      setDebouncedValue(value);

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      if (options?.trailing) setDebouncedValue(value);
      timerRef.current = undefined;
    }, delay);

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [value]);

  const debounce = (newValue: T) => {
    setValue(newValue);
    if (isFirstInteraction) setIsFirstInteraction(false);
  };

  return [debounce, debouncedValue];
};
