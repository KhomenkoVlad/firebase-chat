import "@/styles/App.scss";
import { RouterProvider } from "react-router-dom";
import { Provider as StoreProvider } from "react-redux";
import { AppStore, store } from "./store";
import { router } from "./pages/router";
import { useConnectOnline } from "./features/auth";
import "./lib/i18next/init";

export default function App() {
  useConnectOnline();

  return (
    <StoreProvider store={store}>
      <RouterProvider router={router} />
    </StoreProvider>
  );
}

declare global {
  interface Window {
    Cypress?: any;
    store?: AppStore;
  }
}

if (window.Cypress) {
  window.store = store;
}
