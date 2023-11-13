import React from "react";
import NavButton from "./NavButton";
import { Outlet, Link } from "react-router-dom";

const Navbar = () => {
  return <div>
    <nav className="flex-row shadow-xl shadow-gray-100 sticky top-0">
      <div className="m-3 font-bold text-3xl mr-4 text-sky-900">Grupo 02</div>
      <div className="justify-items-center">
        <Link to="/">
          <NavButton label="Home"></NavButton>
        </Link>
        <Link to="/proyectos">
          <NavButton label="Proyectos"></NavButton>
        </Link>
        <Link to="/nosotros">
          <NavButton label="Nosotros"></NavButton>
        </Link>
      </div>
    </nav>
    <Outlet></Outlet>
    </div>
}

export default Navbar;
