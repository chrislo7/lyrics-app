import React from "react";
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark mb-5">
      <Link to="/" className="navbar-brand btn btn-dark btn-sm mb-0 h1 mx-auto">LyricLynx</Link>
    </nav>
  );
};

export default Navbar;
