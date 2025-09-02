import React from "react";
import "../styles/formAddTally.scss";
import "../styles/global.scss";

export const FormLogin = () => {
    return (
        <form className="form--container form global--container">
            <label className="form__label" htmlFor="email" >Email Address</label>
                <input className="form__input" id="email" type="email" name="email" required />

            <label className="form__label" htmlFor="password">Hasło</label>
                <input className="form__input" id="password" type="password" name="password" required />

            <button className="form__button" type="submit">Login</button>
        </form>
    )
}