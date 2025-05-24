import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

const hour = new Date().getHours();
const timeClass =
  hour < 12
    ? "morning"
    : hour < 17
    ? "afternoon"
    : hour < 21
    ? "evening"
    : "night";

document.body.classList.add(timeClass);

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
