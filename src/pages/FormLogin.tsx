import React, {useState} from "react";
import "../styles/formAddTally.scss";
import "../styles/global.scss";
import {User} from "../types/user";
import {useTallyContext} from "../context/TallyContext";

export const FormLogin = () => {
    const {handleChange} = useTallyContext()
    const [user, setUser] = useState<Omit<User, "id">>({
        email: "",
        password: "",
    });

    return (
        <main className="main">
            <form className="form--container form global--container">
                <label className="form__label" htmlFor="email">Email Address</label>
                <input onChange={(e) => handleChange(e, setUser)} value={user.email} className="form__input" id="email" type="email" name="email" required/>
                <label className="form__label" htmlFor="password">Hasło</label>
                <input onChange={(e) => handleChange(e,setUser)} value={user.password} className="form__input" id="password" type="password" name="password" required/>

                <button className="form__button" type="submit">Login</button>
            </form>
        </main>
    )
}