import axios from "axios";
import { TallyType } from "../types/tally";

export const api = axios.create({
    // baseURL: process.env.BASE_URL,
    baseURL: process.env.REACT_APP_SERVER_URL,
    withCredentials: true,
    headers: { 'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/json' }
})

export const createTally = async (tally: TallyType) => {
    const {
        replaced,
        date_replaced,
        part_brand,
        cost,
        service,
        mechanic,
        guarantee,
        guarantee_time,
        comments,
        current_mileage,
        mileage_before_service,
        warranty_by_mileage,
        document_title,
        documentURL } = tally;
    console.log(tally)
    return await api.post("/add", {
        replaced,
        date_replaced,
        part_brand,
        cost,
        service,
        mechanic,
        guarantee,
        guarantee_time,
        comments,
        current_mileage,
        mileage_before_service,
        warranty_by_mileage,
        document_title,
        documentURL
    }).then((response) => console.log(response.data))
        .catch((error) => console.log(error));
}
