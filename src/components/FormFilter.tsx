import React, {useEffect} from "react";
import "../styles/global.scss"
import "../styles/formFilter.scss"
import {useSearchParams} from "react-router";
import {useTallyContext} from "../context/TallyContext";

export const FormFilter = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const {search, setSearch} = useTallyContext()


    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setSearchParams({searchQuery: search });
        if (!search) setSearchParams({})

        for (const [key, value] of params.entries()) {
            if (!value) {
                params.delete(key);
            }
        }

        if (!search) {
            const newUrl = window.location.pathname + (searchParams ? `?${searchParams}` : "");
            window.history.replaceState({}, "", newUrl);
        }

    }, [search, searchParams])

    return (
        <form className="global--container">
            <input onChange={(e) => setSearch(e.target.value)} className="search__input search" type="search" placeholder="Search" name="search" />
        </form>
    )
}