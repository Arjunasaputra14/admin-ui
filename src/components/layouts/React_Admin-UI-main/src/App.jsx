import "./App.css";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import DashboardPage from "./pages/dashboard";
import ErrorPage from "./pages/error";
import BalancePage from "./pages/balances";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Link } from "react-router-dom";

function App() {
  const myRouter = createBrowserRouter([
    {
      path: "/",
      element: <DashboardPage />,
      errorElement: <ErrorPage/>,
    },
    {
      path: "/login",
      element: <SignInPage/>,
    },
    {
      path: "/register",
      element: <SignUpPage/>
    },
    {
      path: "/balance",
      element: <BalancePage/>
    },
  ]);

  return (
    <>
      <RouterProvider router={myRouter} />
    </>
  );
}

export default App;