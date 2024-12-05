import { useNavigate } from "react-router-dom";

/**
 * Hook to navigate back in the browser history.
 *
 * @returns {() => void} Function to navigate back one step.
 *
 * @example
 * const moveBack = useMoveBack();
 * return <button onClick={moveBack}>Go Back</button>;
 */
export function useMoveBack(): () => void {
  const navigate = useNavigate();
  return () => navigate(-1);
}
