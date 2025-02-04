import { createBrowserRouter } from "react-router-dom";

import ProtectedRoute from "./protectedRoute";
import Layout from "./Layout";
import MainPage from "./MainPage";

function DummyPage() {
  return (
    <iframe
      width="560"
      height="315"
      src="https://www.youtube-nocookie.com/embed/PH6jE5W_vAg?si=tD6XFC5ZN7uE6Khu&amp;controls=0"
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    ></iframe>
  );
}
const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: "/dashboard",
        element: <DummyPage />,
      },
      {
        path: "/profile",
        element: <DummyPage />,
      },
      {
        path: "/companies",
        element: <ProtectedRoute>Empresas</ProtectedRoute>,
      },
      {
        path: "/users",
        element: <ProtectedRoute>Usuarios</ProtectedRoute>,
      },
      {
        path: "/documents",
        element: <ProtectedRoute>Documentos</ProtectedRoute>,
      },
      {
        path: "/notifications",
        element: <DummyPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <DummyPage />,
  },
  {
    path: "/recovery",
    element: <DummyPage />,
  },
  {
    path: "/new_password",
    element: <DummyPage />,
  },
]);

export default AppRouter;
