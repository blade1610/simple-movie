import React from "react";
import {NavLink} from "react-router-dom";
const Header = () => {
  return (
    <header className=" header gap-x-5 flex items-center justify-center py-10 mb-5 text-white">
      <NavLink
        to="/"
        className={({isActive}) => (isActive ? "text-primary" : "")}
      >
        Home
      </NavLink>
      <NavLink
        to="/movies"
        className={({isActive}) => (isActive ? "text-primary" : "")}
      >
        Movies
      </NavLink>
    </header>
  );
};

export default Header;
