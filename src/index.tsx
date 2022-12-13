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
import Fontpick from "./Fontpick";

FlareLane.initialize({ projectId: "43565281-b5e5-48ed-9b57-83e70d343652" });

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
        <Fontpick />
      </RecoilRoot>
    </BrowserRouter>
    <ReactQueryDevtools />
  </QueryClientProvider>
);
