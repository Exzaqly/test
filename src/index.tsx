import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ParamEditor } from "../../untitled10/src/App";
import reportWebVitals from "./reportWebVitals";

const params = [
  {
    id: 1,
    name: "Назначение",
    type: 'string' as const
  },
  {
    id: 2,
    name: "Длина",
    type: 'string' as const
  } 
]

const model = {
  paramValues: [
    {
      paramId: 1,
      value: "повседневное"
    },
    {
      paramId: 2,
      value: "макси"
    }
  ]
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ParamEditor params={params} model={model} />
  </React.StrictMode>
);
reportWebVitals();
