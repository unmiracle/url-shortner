import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "normalize.css";
import "./assets/styles/global.scss";
import App from "./App.tsx";
import { queryClient } from "./utils/query-client.ts";
import { QueryClientProvider } from "@tanstack/react-query";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
);
