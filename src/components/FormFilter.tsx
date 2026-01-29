import React, {useEffect} from "react";
import "../styles/global.scss"
import "../styles/formFilter.scss"
import {useSearchParams} from "react-router";
import {useTallyContext} from "../context/TallyContext";
import {updateParams} from "../utils/utils";

export const FormFilter = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const {search, setSearch} = useTallyContext()

    useEffect(() => {
        updateParams();

        if (search && search.trim() !== "") {
            setSearchParams({ searchQuery: search });
        } else {
            setSearchParams({});
        }

    }, [search, searchParams])

    return (
        <form onSubmit={(e) => e.preventDefault()} className="">
            <input
                onChange={(e) => setSearch(e.target.value)}
                className="search__input search"
                type="text"
                placeholder="Wyszukaj"
                name="search"
                value={search}
            />
        </form>
    )
}