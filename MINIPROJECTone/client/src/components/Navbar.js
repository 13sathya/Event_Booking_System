import React from 'react';

function Navbar() {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  const owner = JSON.parse(localStorage.getItem('currentOwner'));

  function logout() {
    // Clear the current user or owner from local storage
    if (owner) {
      localStorage.removeItem('currentOwner');
      window.location.href = '/ownerlogin'; // Redirect to owner login
    } else if (user) {
      localStorage.removeItem('currentUser');
      window.location.href = '/login'; // Redirect to user login
    }
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="/home">EVENTS</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto" id='ss'>
              {owner ? (
                <>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {'owner'} {/* Display owner's email or name */}
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <a className="dropdown-item" href="#" onClick={logout}>Logout</a>
                    </div>
                  </div>
                </>
              ) : user ? (
                <>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {user.name} {/* Display user's name */}
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <a className="dropdown-item" href="/profile">Profile</a>
                      <a className="dropdown-item" href="#" onClick={logout}>Logout</a>
                    </div>
                  </div>
                </>
              ) : (
                <div className="d-flex">
                  <div className="dropdown me-3">
                    <button
                      className="btn btn-secondary dropdown-toggle"
                      type="button"
                      id="dropdownMenuButtonOwner"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Owner
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButtonOwner">
                      <a className="dropdown-item" href="/ownerlogin">Login</a>
                    </div>
                  </div>

                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle"
                      type="button"
                      id="dropdownMenuButtonUser"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      User
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButtonUser">
                      <a className="dropdown-item" href="/register">Register</a>
                      <a className="dropdown-item" href="/login">Login</a>
                    </div>
                  </div>
                </div>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
