import { FunctionComponent, useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { getUserFromToken, isLoggedIn, logOut } from "../service/userServices";

const Navbar: FunctionComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const user = getUserFromToken();
    setLoggedIn(isLoggedIn());
    setUserId(user?._id || "");
  }, [location.pathname]);

  function handleLogout() {
    logOut();
    setLoggedIn(false);
    setUserId("");
    navigate("/login");
  }

  const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${userId || "guest"}`;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm py-3">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-4" to="/">
          Home
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-3">
            {loggedIn && (
              <li className="nav-item">
                <NavLink className="nav-link fw-semibold" to="/stats">
                  Stats
                </NavLink>
              </li>
            )}

            {!loggedIn ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link fw-semibold" to="/login">
                    Login
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    className="btn btn-primary btn-sm px-4"
                    to="/register"
                  >
                    Register
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <span
                    className="badge rounded-pill bg-success d-flex align-items-center gap-2 px-3 py-2"
                    title="Member account"
                  >
                    <i className="fa-solid fa-circle-check"></i>
                    Member
                  </span>
                </li>

                <li className="nav-item">
                  <img
                    src={avatarUrl}
                    alt="User avatar"
                    width="38"
                    height="38"
                    className="rounded-circle border border-light bg-light"
                  />
                </li>

                <li className="nav-item">
                  <button
                    className="btn btn-outline-light btn-sm px-4"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
