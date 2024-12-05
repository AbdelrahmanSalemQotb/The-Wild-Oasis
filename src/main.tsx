import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import App from "./App.tsx";
import GlobalStyles from "./styles/GlobalStyles.tsx";
import ErrorFallback from "./ui/common/errors/ErrorFallback.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <>
      <GlobalStyles />

      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => {
          window.location.replace("/");
        }}
      >
        <App />
      </ErrorBoundary>
    </>
  </StrictMode>
);
