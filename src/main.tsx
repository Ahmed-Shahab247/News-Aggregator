import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { NhostClient, NhostProvider } from "@nhost/react";
import './index.css'

const nhost = new NhostClient({
  subdomain: "",// ✅ Your Nhost subdomain
  region: "",// ✅ Your Nhost region
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NhostProvider nhost={nhost}>
      <App />
    </NhostProvider>
  </React.StrictMode>
);
