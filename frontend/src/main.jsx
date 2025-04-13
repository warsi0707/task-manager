import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {Toaster} from 'react-hot-toast'
import AuthProvider from "./context/authProvider.jsx";
createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <>
    <div className="min-h-screen py-10 w-full  [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
      <Toaster position="top-right"/>
      <AuthProvider>
      <App />
      </AuthProvider>

    </div>
  </>
);
