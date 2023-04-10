// src/index.js
import React from "react";
import GlobalStyles from "./styles/GlobalStyles";
import App from "./App";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ReactDOM from "react-dom/client";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

function getLibrary(provider) {
  const library = new Web3Provider(provider, "any");
  return library;
}

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
const queryClient = new QueryClient();
root.render(
  // <React.StrictMode>
  <>
  <Web3ReactProvider getLibrary={getLibrary}>
    <GlobalStyles />
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      <BrowserRouter>
        <ScrollToTop/>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
    </Web3ReactProvider>
  </>
  // </React.StrictMode>
);
