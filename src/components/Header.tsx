import React, {useEffect} from "react";
import "../styles/header.scss";
import {Link, useNavigate} from "react-router";
import {useTallyContext} from "../context/TallyContext";

export const Header: React.FC = () => {
    const navigate = useNavigate();
    const {localToken, setLocalToken, handleLogout} = useTallyContext()

    useEffect(() => {
        setLocalToken(localStorage.getItem("token"));
    }, [localToken]);

    return (
        <nav className="nav ">
            <div className="nav__links global--container">
                <Link className="link" to="/">Strona główna</Link>
                {localToken &&
                    <>
                        <Link className="link" to="/list"> Zestawienie serwisowe</Link>
                        <Link className="link" to="/add">Dodaj usługę</Link>
                    </>
                }
                {!localToken ?
                    <Link className="link" to="/login">Zaloguj</Link> :
                    <Link onClick={(e) => handleLogout(e, navigate)} className="link" to="/login">Wyloguj</Link>
                }
            </div>

        </nav>
    )
}