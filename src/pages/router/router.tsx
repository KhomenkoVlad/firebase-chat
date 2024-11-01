import { Home } from "@/pages/home";
import { Login } from "@/pages/login";
import { Register } from "@/pages/register";
import { createBrowserRouter } from "react-router-dom";
import { homeLoader, loginLoader } from "./loaders";
import { SettingsPage } from "@/pages/settings";
import { APP_BASE_PATH } from "@/config/constants";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Home />,
      loader: homeLoader,
    },
    {
      path: "/login",
      element: <Login />,
      loader: loginLoader,
    },
    {
      path: "/register",
      element: <Register />,
      loader: loginLoader,
    },
    {
      path: "/user-settings",
      element: <SettingsPage />,
      loader: homeLoader,
    },
    {
      path: "/chat-settings",
      element: <SettingsPage />,
      loader: homeLoader,
    },
  ],
  {
    basename: APP_BASE_PATH,
  }
);
