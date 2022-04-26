import { StoreContextProvider } from "@digitak/gravity-react/StoreContext";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<StoreContextProvider>
			<App />
		</StoreContextProvider>
	</React.StrictMode>,
);
