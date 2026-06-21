import "./app.css";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { TlinePage } from "./pages/TlinePage.jsx";

function getRoute() {
  const path = window.location.pathname;
  if (path === "/tline" || path.startsWith("/tline/")) return "tline";
  return "home";
}

function Router() {
  const route = getRoute();
  if (route === "tline") return <TlinePage />;
  return <App />;
}

createRoot(document.getElementById("app")).render(<Router />);
