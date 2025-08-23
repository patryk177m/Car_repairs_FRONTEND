import React from "react";
import "../styles/header.scss";
import {Link} from "react-router";

export const Header: React.FC = () => {
    return (
        <nav className="nav ">
            <div className="nav__links global--container">
                <Link className="link" to="/">Strona główna</Link>
                <Link className="link" to="/list"> Zestawienie serwisowe</Link>
                <Link className="link" to="/add">Dodaj usługę</Link>
            </div>

        </nav>
    )
}