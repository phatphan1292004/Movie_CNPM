import { Navigate } from "react-router-dom";
import useUserStore from "../store/useUserStore";

const PrivateRoute = ({ children }) => {
  const { user } = useUserStore();
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
