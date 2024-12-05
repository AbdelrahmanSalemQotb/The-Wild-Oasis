import { useEffect, useRef } from "react";

/**
 * Custom hook to detect and handle clicks outside a specified element.
 *
 * This hook sets up a listener on the `document` to detect clicks outside the referenced element
 * and triggers the provided `handler` function when such clicks occur. It is especially useful
 * for implementing dropdowns, modals, or similar UI components that require closing when the user
 * clicks elsewhere on the page.
 *
 * @template T - The type of the HTML element being referenced (defaults to `HTMLDivElement`).
 * @param {() => void} handler - The function to execute when an outside click is detected.
 * @param {boolean} [listenCapturing=true] - Indicates whether to listen during the capture phase.
 *    - `true` (default): The event is intercepted in the capturing phase.
 *    - `false`: The event is intercepted in the bubbling phase.
 * @returns {React.RefObject<T>} - A React `ref` object to be attached to the target element.
 *
 * @example
 * // Usage Example
 * function Dropdown() {
 *   const [isOpen, setIsOpen] = useState(false);
 *   const ref = useOutsideClick(() => setIsOpen(false));
 *
 *   return (
 *     <div ref={ref}>
 *       {isOpen && <div className="dropdown-menu">Menu Content</div>}
 *     </div>
 *   );
 * }
 */
export function useOutsideClick<T extends HTMLElement = HTMLDivElement>(
  handler: () => void,
  listenCapturing = true
) {
  const ref = useRef<T | null>(null);

  useEffect(
    function () {
      function handleClick(e: Event) {
        if (ref.current && !ref.current.contains(e.target as Node)) {
          handler();
        }
      }

      document.addEventListener("click", handleClick, listenCapturing);

      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );

  return ref;
}
