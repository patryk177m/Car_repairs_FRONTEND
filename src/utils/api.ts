import axios from "axios";
import {TallyType} from "../types/tally";
import {Dispatch, SetStateAction} from "react";

export const api = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    withCredentials: true,
    headers: {'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/json'}
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// api.interceptors.response.use(
//     (res) => res,
//     (err) => {
//         if (err.response?.status === 401) {
//             console.warn("⚠️ Unauthorized");
//         }
//         return Promise.reject(err);
//     }
// );

export const getTallies = async () => {
    const response = await api.get<TallyType[]>("/list");
    return response.data as TallyType[];
}

export const getTallyById = async (id: string) => {
    if (!id) return;
    const response = await api.get<TallyType>(`/list/${id}`);
    return response.data as TallyType;
}

export const createTally = async (tally: Omit<TallyType, "id">) => {
    return await api.post("/add", tally)
        .then((response) => response.data)
        .catch((error) => console.log(error));
}

export const deleteTally = async (id: string) => {
    if (!id) return;
    return await api.delete(`/delete/${id}`);
}

export const updateTally = async (id: string, tally: Omit<TallyType, "id">) => {
    if (!id) return;
    const response = await api.put(`/update/${id}`, tally);
    return response.data;
}

export const getFilteredTallies = async (searchQuery: string)=> {
    const params = new URLSearchParams({searchQuery: searchQuery});
    const response = await api.get<TallyType[]>(`/list/search?${params.toString()}`);
    return response.data as TallyType[];
}

// auth

export const login = async (email: string, password: string, setError :Dispatch<SetStateAction<string>>) => {
    if (!email || !password) return;

    return await api.post("/login", {
        email,
        password,
    })
        .then((response) => response.data)
        .catch((err) => {
            if (axios.isAxiosError(err)) {
                if (err.response?.status === 401) {
                    setError("❌ Nieprawidłowy email lub hasło");
                } else {
                    setError("⚠️ Wystąpił błąd serwera");
                }
            } else {
                setError("⚠️ Nieznany błąd");
            }
        });
}

export const logout = async () => {
    return await api
        .get('/logout')
        .then((res) => res.data.status)
        .catch(() => 'Error logging out! Try again.')
}