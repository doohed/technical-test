import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const loggedIn = window.localStorage.getItem("isLoggedIn");
  return loggedIn ? element : <Navigate to="/" />;
};

export default ProtectedRoute;
