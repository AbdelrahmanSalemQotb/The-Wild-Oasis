import { useState, useEffect } from "react";
/**
 * Hook to check if a media query matches.
 *
 * @param query - Media query string (e.g., "(max-width: 1150px)").
 * @returns `true` if the query matches, otherwise `false`.
 *
 * @example
 * // Usage Example
 * function App() {
 *   const isMobile = useMediaQuery("(max-width: 768px)");
 *
 *   return (
 *     <div>
 *       <h1>Welcome</h1>
 *       {isMobile ? <p>You're on a small screen.</p>
 *                 : <p>You're on a large screen.</p>}
 *     </div>
 *   );
 * }
 */
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    setMatches(mediaQueryList.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQueryList.addEventListener("change", handleChange);

    return () => {
      mediaQueryList.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
};
