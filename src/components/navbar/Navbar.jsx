import React from "react";
import NavButton from "./NavButton";
import { Outlet, Link } from "react-router-dom";


const Navbar = () => {
  return <div>
    <nav className="flex-row shadow-xl shadow-sky-900/[.04] sticky top-0 bg-white">
      <div className="m-3 font-bold text-3xl mr-4 text-sky-900">Grupo 02</div>
      <div className="justify-items-center">
        <Link to="/">
          <NavButton label="Home"></NavButton>
        </Link>
        <Link to="/react">
          <NavButton label="Proyectos en React"></NavButton>
        </Link>
        <Link to="/phaser-js">
          <NavButton label="Proyectos en PhaserJS"></NavButton>
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
