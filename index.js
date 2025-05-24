import React from "react";
import ReactDOM from "react-dom/client"; // <- dòng bị thiếu
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Forest from "./components/Forest";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/forest" element={<Forest />} />
    </Routes>
  </BrowserRouter>
);
