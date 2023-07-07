import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function ProtectedRoute({ children, ...props }) {
  const { loggedIn } = useContext(CurrentUserContext);
  return (
    <Route {...props}>{loggedIn ? children : <Redirect to="/main" />}</Route>
  );
}

export default ProtectedRoute;
