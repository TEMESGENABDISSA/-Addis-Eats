import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="page empty-state">
      <h1>404</h1>

      <h2>Page Not Found</h2>

      <p>Sorry, the page you are looking for does not exist.</p>

      <Link className="button" to="/">
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;
