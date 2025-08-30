import axios from "axios";
import { TallyType } from "../types/tally";

export const api = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    withCredentials: true,
    headers: { 'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/json' }
})

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
    return await api.post("/add", tally).then((response) => response.data)
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
