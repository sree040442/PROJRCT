import { useState } from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import App from "./App";
import "./index.css";
import CartState from "./utils/CartState";

// const [user, setUser] = useState({});

ReactDOM.createRoot(document.getElementById("root")).render(
  <CartState>
    <App />
    <Toaster />
  </CartState>
);
