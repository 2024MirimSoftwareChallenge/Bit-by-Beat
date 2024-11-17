import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";

const Nav = () => {
    return (
        <nav>
            <div className="icon-container">
                <NavLink to="/Search">
                    {({ isActive }) => (
                        <img src={isActive ? "/images/ActiveSearch.png" : "/images/DisactiveSearch.png"} alt="search-icon"/>
                    )}
                </NavLink>
                <NavLink to="/">
                    {({ isActive }) => (
                        <img src={isActive ? "/images/ActiveHome.png" : "/images/DisactiveHome.png"} alt="home-icon"/>
                    )}
                </NavLink>
                <NavLink to="/Calendar" activeClassName="active">
                    {({ isActive }) => (
                        <img src={isActive ? "/images/ActivCal.png" : "/images/DisactiveCal.png"} alt="cal-icon"/>
                    )}
                </NavLink>
            </div>
        </nav>
    );
};

export default Nav;