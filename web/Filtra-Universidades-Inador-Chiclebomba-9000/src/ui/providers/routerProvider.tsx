import AppRouter from "../pages/router";
import {
  RouterProvider,
} from "react-router-dom";

const AppRouterProvider: React.FC = () => {

  return (
    <RouterProvider router={AppRouter} />
  )
  
}

export default AppRouterProvider
