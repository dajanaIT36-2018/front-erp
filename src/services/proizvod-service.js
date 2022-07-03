import axios from "axios";
//import { token } from "./auth-service";

export const getProizvodById = async (id) => {
    const data = await axios.get('https://localhost:44318/api/proizvodi/' + id,/*  { headers: {"Authorization" : `Bearer ${token()}`} } */);
    return data;
}

export const getProizvodi = async () => {
    const data = await axios.get('https://localhost:44318/api/proizvodi/'/* , { headers: {"Authorization" : `Bearer ${token()}`} } */);
    return data;
}


export const updateProizvod = async (proizvod) => {
    return await axios.put('https://localhost:44318/api/proizvodi/', proizvod/* , { headers: {"Authorization" : `Bearer ${token()}`} } */);
}

export const createProizvod = async (proizvod) => {
    return await axios.post('https://localhost:44318/api/proizvodi/' , proizvod /* , { headers: {"Authorization" : `Bearer ${token()}`} } */);
}

export const deleteProizvod = async (id) => {
    return await axios.delete('https://localhost:44318/api/proizvodi/' + id/* , { headers: {"Authorization" : `Bearer ${token()}`} } */);
}