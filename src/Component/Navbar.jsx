import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Authcontext from '../Authcontext/Authcontext';

const Navbar = () => {
  const { user, signOut } = useContext(Authcontext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Navbar
        </a>
        {user ? (
          <NavLink className="btn btn-outline-success" to="/favorite">
            Favorite
          </NavLink>
        ) : null}


        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
          <form className="d-flex">
            {user ? (
              <>
                <h2>{user.displayname}</h2>
                <button onClick={signOut} className="btn btn-outline-danger m-2">
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink className="btn btn-outline-success m-2" to="/signup">
                  Signup
                </NavLink>
                <NavLink className="btn btn-outline-success m-2" to="/login">
                  Login
                </NavLink>
              </>
            )}
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
