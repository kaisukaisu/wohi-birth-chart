import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";



// 🔹 Poistettu: import "astrochart2";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      {/* Your app content */}
        <App />
        </BrowserRouter>
   
  </StrictMode>
);
