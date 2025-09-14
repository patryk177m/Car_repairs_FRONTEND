import React, {FormEvent, useState} from "react";
import {useTallyContext} from "../context/TallyContext";

export const FormAddCurrentlyMileage = () => {
    const { valueCurrentMileage, setValueCurrentMileage} = useTallyContext()
    const [currentlyMileage, setCurrentlyMileage] = useState<string>("")

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    const handleClick = () => {
        if (isNaN(Number(currentlyMileage))) return setCurrentlyMileage("")
        setValueCurrentMileage(Number(currentlyMileage))
        setCurrentlyMileage("")
    }

    return (
        <form onSubmit={handleSubmit} className="form_currently_mileage">
            <label>Aktualny przebieg:</label>
            <input className="currently_mileage__input" type="text" value={valueCurrentMileage} name="currlentlyMileageDisabled" disabled={true}/>
            <input className="currently_mileage__input" onChange={e => {setCurrentlyMileage(e.target.value)}} value={currentlyMileage} type="text" name="currentlyMileage" placeholder="Wprowadź Aktualny przebieg:" />
            <button className="form__button--currently_mileage" onClick={handleClick} type="submit">+</button>
        </form>
    )
}