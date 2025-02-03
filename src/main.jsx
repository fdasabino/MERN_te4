import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "./context/theme/theme.context";
import AppRoutes from "./routes/app.routes.jsx";
import { persistor, store } from "./store/index.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
