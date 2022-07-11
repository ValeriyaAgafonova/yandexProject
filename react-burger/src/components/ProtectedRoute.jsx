import { useSelector } from "react-redux";
import { Redirect, Route, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, onlyForAuth = false, ...rest }) => {
  const location = useLocation();
  const userName = useSelector((state) => state.auth.userName);

  if (userName && onlyForAuth) {
    const { from } = location.state || { from: { pathname: "/" } };
    console.log(from);
    return (
      <Route {...rest}>
        <Redirect to={from} />
      </Route>
    );
  }
  if (!userName && !onlyForAuth) {
    return (
      <Route {...rest}>
        <Redirect to={{ pathname: "/login", state: { from: location } }} />
      </Route>
    );
  }
  return <Route {...rest}>{children}</Route>;
};

export default ProtectedRoute;
