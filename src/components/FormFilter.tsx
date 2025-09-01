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
        console.log(search)
        let changed = false;
        for (const [key, value] of params.entries()) {
            if (!value || value === "") {
                params.delete(key);
                changed = true;
            }
        }

        if (!changed) {
            const newUrl = window.location.pathname + (params.toString() ? `?${params.toString()}` : "");
            window.history.replaceState({}, "", newUrl);
        }

        if (search && search.trim() !== "") {
            setSearchParams({ searchQuery: search });
        } else {
            setSearchParams({});
        }

    }, [search, searchParams])

    return (
        <form className="global--container">
            <input onChange={(e) => setSearch(e.target.value)} className="search__input search" type="search" placeholder="Search" name="search" />
        </form>
    )
}