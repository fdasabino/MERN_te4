import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router";
import Home from "./Home.jsx";
import Dashboard from "./admin/Dashboard.jsx";
import Login from "./auth/Login.jsx";
import Register from "./auth/Register.jsx";

const routes = [
  {
    id: 1,
    path: "/",
    element: <Home />,
    protected: false,
  },
  {
    id: 2,
    path: "/login",
    element: <Login />,
    protected: false,
  },
  {
    id: 3,
    path: "/register",
    element: <Register />,
    protected: false,
  },
  {
    id: 4,
    path: "/admin/dashboard",
    element: <Dashboard />,
    protected: true,
  },
];

const ProtectedRoute = ({ element }) => {
  const { user } = useSelector((state) => state.user);
  return user ? (
    element
  ) : (
    <Navigate
      to="/login"
      replace
    />
  );
};

const AppRoutes = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <Routes>
      {routes.map(({ id, path, element, protected: isProtected }) => (
        <Route
          key={id}
          path={path}
          element={isProtected ? <ProtectedRoute element={element} /> : element}
        />
      ))}

      {user && (
        <Route
          path="/login"
          element={
            <Navigate
              to="/admin/dashboard"
              replace
            />
          }
        />
      )}
      {user && (
        <Route
          path="/register"
          element={
            <Navigate
              to="/admin/dashboard"
              replace
            />
          }
        />
      )}

      {/* Default catch-all route */}
      <Route
        path="*"
        element={
          <Navigate
            to={user ? "/admin/dashboard" : "/"}
            replace
          />
        }
      />
    </Routes>
  );
};

ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

export default AppRoutes;
