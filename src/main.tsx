import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./css/default.css";
import "./css/styles.css";
import "./css/responsive.css";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Toaster />
    <App />
  </React.StrictMode>
);
