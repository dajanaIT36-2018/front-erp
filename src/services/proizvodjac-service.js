import axios from "axios";
//import { token } from "./auth-service";

export const getProizvodjacById = async (id) => {
    const data = await axios.get('https://localhost:44318/api/proizvodjaci/' + id,/*  { headers: {"Authorization" : `Bearer ${token()}`} } */);
    return data;
}

export const getProizvodjaci = async () => {
    const data = await axios.get('https://localhost:44318/api/proizvodjaci/'/* , { headers: {"Authorization" : `Bearer ${token()}`} } */);
    return data;
}

/* export const getBooksByTitle = async (title) => {
    const data = await axios.get('http://localhost:8083/book-store/books/?book_title=' + title, { headers: {"Authorization" : `Bearer ${token()}`} });
    return data;
} */


export const updateProizvodjac = async (proizvodjac) => {
    return await axios.put('https://localhost:44318/api/proizvodjaci/', proizvodjac/* , { headers: {"Authorization" : `Bearer ${token()}`} } */);
}

export const createProizvodjac = async (proizvodjac) => {
    return await axios.post('https://localhost:44318/api/proizvodjaci/' , proizvodjac/* , { headers: {"Authorization" : `Bearer ${token()}`} } */);
}

export const deleteProizvodjac = async (id) => {
    return await axios.delete('https://localhost:44318/api/proizvodjaci/' + id/* , { headers: {"Authorization" : `Bearer ${token()}`} } */);
}