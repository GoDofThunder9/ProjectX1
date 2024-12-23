import React from "react";
import "../../assets/Style/HomeStyle/Navbar.css"; // Assuming you have CSS styles in App.css or equivalent
import logo from "../../assets/Images/logo.png"
const App = () => {
  return (
    <>
<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">
      <img
        src={logo}
        alt="Company Logo"
        style={{ height: "40px" }}
        className="d-inline-block align-text-top"
      />
    </a>
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
      {/* Add 'mx-auto' to center the list */}
      <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link" href="#">
            Home
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Services
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Testimonial
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            About Us
          </a>
        </li>
      </ul>
      <div className="d-flex">
        <a href="#" className="btn btn-primary me-2">
          Log In
        </a>
        <a href="#" className="btn btn-primary">
          Sign Up
        </a>
      </div>
    </div>
  </div>
</nav>
    </>
  )
};

export default App;
