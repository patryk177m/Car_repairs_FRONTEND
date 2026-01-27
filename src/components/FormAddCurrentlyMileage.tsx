import "../styles/FormAddCurrentlyMileage.scss";
import React, {FormEvent, useEffect, useRef, useState} from "react";
import {useTallyContext} from "../context/TallyContext";

export const FormAddCurrentlyMileage = () => {
    const { valueCurrentMileage, setValueCurrentMileage} = useTallyContext()
    const inputRef = useRef<HTMLInputElement>(null);
    const [disable, setDisable] = useState<boolean>(false);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setValueCurrentMileage(Number(e.currentTarget.value));
            setDisable(true);
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setValueCurrentMileage(Number(e.currentTarget.value));
        if(valueCurrentMileage <= 0) return;
        setDisable(true);
    };

    const handleDoubleClick = (e:  React.MouseEvent<HTMLLabelElement>) => {
        setDisable(false);
        setTimeout(() => {
            inputRef.current!.focus();
        }, 200)
    }

    useEffect(() => {
        inputRef.current!.focus();
    }, [valueCurrentMileage]);

    return (
        <form onSubmit={handleSubmit} className="form_currently_mileage">
            <label className="currently_mileage__label" onDoubleClick={handleDoubleClick}>Aktualny przebieg:</label>
            {!disable ? (
                    <input ref={inputRef}
                           onKeyDown={handleKeyDown}
                           onBlur={handleBlur}
                           className="currently_mileage__input currently_mileage__input--green"
                           type="number"
                           name="currlentlyMileageDisabled"
                    />
                ) : (
                <input className="currently_mileage__input currently_mileage__input--red" type="number" disabled />
                )
            }
        </form>
    )
}