import { useState, useEffect, Dispatch } from "react";

type UseLocalStorageStateReturn<T> = [
  value: T,
  setValue: Dispatch<React.SetStateAction<T>>
];

/**
 * Custom hook to manage state synchronized with `localStorage`.
 *
 * This hook provides a React stateful value that is persisted in `localStorage`,
 * allowing data to be retained across browser sessions. When initialized, it
 * checks for an existing value in `localStorage` associated with the given `key`.
 * If no value is found, it uses the provided `initialState`.
 *
 * Any updates to the state will automatically update the corresponding
 * `localStorage` entry.
 *
 * @template T - The type of the state value.
 * @param {T} initialState - The initial state value if no value exists in `localStorage`.
 * @param {string} key - The key used to store and retrieve the value from `localStorage`.
 * @returns {UseLocalStorageStateReturn<T>} A tuple containing:
 *    - `value`: The current state value.
 *    - `setValue`: A function to update the state and the `localStorage`.
 *
 * @example
 * // Usage Example
 * function Counter() {
 *   const [count, setCount] = useLocalStorageState<number>(0, "counter");
 *
 *   return (
 *     <div>
 *       <p>Count: {count}</p>
 *       <button onClick={() => setCount(count => count + 1)}>Increment</button>
 *       <button onClick={() => setCount(0)}>Reset</button>
 *     </div>
 *   );
 * }
 */
export function useLocalStorageState<T>(
  initialState: T,
  key: string
): UseLocalStorageStateReturn<T> {
  const [value, setValue] = useState<T>(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}
