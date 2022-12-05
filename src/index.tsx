import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ScrollToTop from "./hooks/ScrollToTop";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RecoilRoot } from "recoil";
import FlareLane from "@flarelane/flarelane-web-sdk";

FlareLane.initialize({ projectId: "a201b475-fab4-47e3-94e7-dcb905e8afa4" });

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <RecoilRoot>
        <ScrollToTop />
        <App />
      </RecoilRoot>
    </BrowserRouter>
    <ReactQueryDevtools />
  </QueryClientProvider>
);
