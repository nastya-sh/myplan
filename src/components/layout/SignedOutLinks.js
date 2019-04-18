import React from "react";
import { NavLink } from "react-router-dom";

const SignedOutLinks = () => {
  return (
    <ul className="right">
      <li data-e2e="signup">
        <NavLink to="/signup">Signup</NavLink>
      </li>
      <li data-e2e="signin">
        <NavLink to="/signin">Login</NavLink>
      </li>
    </ul>
  );
};

export default SignedOutLinks;
