import React, {useEffect} from "react";
import "../styles/global.scss"
import "../styles/formFilter.scss"
import {useTallyContext} from "../context/TallyContext";

export const FormFilter = () => {
    const {search, setSearch} = useTallyContext()


    useEffect(() => {

    }, [search])

    return (
        <form className="global--container">
            <input onChange={(e) => setSearch(e.target.value)} className="search__input search" type="search" placeholder="Search" name="search" />
        </form>
    )
}