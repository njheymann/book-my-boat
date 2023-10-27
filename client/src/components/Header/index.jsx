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
        <div>
          {Auth.loggedIn() ? (
            <>
              <h1>Book My Boat</h1>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <h1>Book My Boat</h1>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
