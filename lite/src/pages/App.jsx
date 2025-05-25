
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivateRoute from '../components/PrivateRoute.jsx'
import PublicRoute from '../components/PublicRoute.jsx'
import Login from './Login.jsx'
import Inicio from './Inicio.jsx'

const router = createBrowserRouter([
  { path: "/", element:( 
  <PublicRoute>
    <Login />
  </PublicRoute>
  ) },
  {path: "/companies", element: (
    <PrivateRoute>
      <Inicio />
    </PrivateRoute>
  )}
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
