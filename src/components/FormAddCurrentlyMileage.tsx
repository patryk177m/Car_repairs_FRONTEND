import "../styles/FormAddCurrentlyMileage.scss";
import React, {FormEvent, useEffect, useRef, useState} from "react";
import {useTallyContext} from "../context/TallyContext";

export const FormAddCurrentlyMileage = () => {
    const { valueCurrentMileage, setValueCurrentMileage} = useTallyContext()
    const inputRef = useRef<HTMLInputElement>(null);
    const [disabled, setDisabled] = useState<boolean>(false);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const current = e.currentTarget.value;
        if (current === "") return;
        if (e.key === "Enter") {
            setValueCurrentMileage(Number(current));
            setDisabled(true);
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const current = e.currentTarget.value;
        if (current === "") return;
        if(current !== "") setValueCurrentMileage(Number(current));
        setDisabled(true);
    };

    const handleDoubleClick = (e:  React.MouseEvent<HTMLLabelElement>) => {
        setDisabled(false);
        setTimeout(() => {
            inputRef.current!.focus();
        }, 200)
    }

    useEffect(() => {
        if(valueCurrentMileage > 0) {
            setDisabled(true);
            return
        }
        inputRef.current?.focus();
    }, [valueCurrentMileage]);

    return (
        <form onSubmit={handleSubmit} className="form_currently_mileage">
            <label
                className="currently_mileage__label"
                onDoubleClick={handleDoubleClick}
            >
                Aktualny przebieg:
            </label>
            {!disabled ? (
                <input ref={inputRef}
                       onKeyDown={handleKeyDown}
                       onBlur={handleBlur}
                       className="currently_mileage__input currently_mileage__input--red"
                       type="number"
                       name="currlentlyMileageDisabled"
                />
                ) : (
                <input
                    className="currently_mileage__input currently_mileage__input--green"
                    type="number"
                    disabled
                />)
            }
        </form>
    )
}