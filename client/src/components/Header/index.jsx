/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";

import Auth from "../../utils/auth";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header>
      <div className="header-contents">
        <h1 className="m-0">Book My Boat</h1>

        <div>
          {Auth.loggedIn() ? (
            <>
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button>
                {" "}
                <Link className="btn btn-lg btn-info m-2" to="/">
                  Login
                </Link>
              </button>
              <button>
                <Link className="btn btn-lg btn-light m-2" to="/signup">
                  Signup
                </Link>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
