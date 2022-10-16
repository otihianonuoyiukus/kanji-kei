import React from "react";
import PropTypes from "prop-types";

NavigationBarButton.propTypes = {
  label: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  isCurrent: PropTypes.bool.isRequired,
};

function NavigationBarButton(props) {
  let opts = {};
  props.isCurrent ? (opts["aria-current"] = "page") : null;

  return (
    <a
      className={`nav-link fw-bold py-1 px-0 ${props.status}`}
      {...opts}
      href="#"
    >
      <span>{props.label}</span>
    </a>
  );
}

function NavigationBar(props) {
  return (
    <header className="mb-auto">
      <div>
        <img
          id="nav-icon"
          className="float-md-start mb-0"
          src="http://localhost:3000/src/assets/images/logo.png"
        />
        <span className="float-md-start mb-0 h1">kanjikei</span>
        <nav className="h2 nav nav-masthead justify-content-center float-md-end">
          <NavigationBarButton
            label="Home"
            status="inactive"
            isCurrent={false}
          />
          <NavigationBarButton
            label="About"
            status="inactive"
            isCurrent={false}
          />
        </nav>
      </div>
    </header>
  );
}

export default NavigationBar;
