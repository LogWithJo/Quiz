import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import App from "./App.tsx";
import { AppProvider } from "./context/AppContext.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ThemeProvider defaultTheme="light">
			<AppProvider>
				<BrowserRouter>
					<Toaster />
					<App />
				</BrowserRouter>
			</AppProvider>
		</ThemeProvider>
	</StrictMode>,
);
