import "./app.css";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { TlinePage } from "./pages/TlinePage.jsx";
import { AggregatePage } from "./pages/AggregatePage.jsx";

function getRoute() {
  const path = window.location.pathname;
  if (path === "/tline" || path.startsWith("/tline/")) return "tline";
  if (path === "/aggregate") return "aggregate";
  return "home";
}

function Router() {
  const route = getRoute();
  if (route === "tline") return <TlinePage />;
  if (route === "aggregate") return <AggregatePage />;
  return <App />;
}

createRoot(document.getElementById("app")).render(<Router />);
