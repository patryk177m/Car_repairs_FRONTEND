import React, {FormEvent, useState} from "react";

export const FormAddCurrentlyMileage = () => {
    const [currentlyMileage, setCurrentlyMileage] = useState<string>("")
    const [value, setValue] = useState<number>(0)

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    const handleClick = () => {
        if (isNaN(Number(currentlyMileage))) return setCurrentlyMileage("")
        setValue(Number(currentlyMileage))
        setCurrentlyMileage("")
    }

    return (
        <form onSubmit={handleSubmit} className="form_currently_mileage">
            <label>Aktualny przebieg:</label>
            <input className="currently_mileage__input" type="text" value={value} name="currlentlyMileageDisabled" disabled={true}/>
            <input className="currently_mileage__input" onChange={e => {setCurrentlyMileage(e.target.value)}} value={currentlyMileage} type="text" name="currentlyMileage" placeholder="Wprowadź Aktualny przebieg:" />
            <button className="form__button--currently_mileage" onClick={handleClick} type="submit">+</button>
        </form>
    )
}