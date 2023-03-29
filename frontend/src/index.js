// src/index.js
import React from "react";
import GlobalStyles from "./styles/GlobalStyles";
import App from "./App";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter } from "react-router-dom";
const container = document.getElementById("root");
const root = createRoot(container);
const queryClient = new QueryClient();
root.render(
  // <React.StrictMode>
  <>
    <GlobalStyles />
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </>
  // </React.StrictMode>
);
