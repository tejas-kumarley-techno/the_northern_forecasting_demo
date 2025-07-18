import React, { useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Routes } from "../utils/route";
import NotFound from "./pages/errors/not-found-error";
import Dashboard from "./pages/dashboard";
import Header from "@/components/coustomComponent/Header";

const Setup = () => {
  const routers = useMemo(() => {
    return createBrowserRouter(
      [
        {
          path: "",
          element: <Header />,
          children: [
            {
              path: Routes.DASHBOARD,
              lazy: async () => ({
                Component: Dashboard,
              }),
              index: true,
            },
          ],
        },
        {
          path: Routes.FALLBACK,
          element: <NotFound />,
        },
      ],
      {
        basename: "/northern-prediction/", // config due to same port multiple project
      }
    );
  }, []);

  return <RouterProvider router={routers} />;
};

const Router: React.FC = () => {
  return <Setup />;
};

export default Router;
