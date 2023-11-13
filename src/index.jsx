// Importando dependencias de React
import React from "react";
import ReactDOM from "react-dom/client";

// Importando otros componentes
import App from "./App";
import { BrowserRouter } from "react-router-dom";

// Inicio del código del componente
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
<BrowserRouter>
<App></App>
</BrowserRouter>
);