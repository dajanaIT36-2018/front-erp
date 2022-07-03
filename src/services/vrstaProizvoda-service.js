import axios from "axios";
//import { token } from "./auth-service";

export const getVrstaProizvodaById = async (id) => {
    const data = await axios.get('https://localhost:44318/api/vrsteProizvoda/' + id,/*  { headers: {"Authorization" : `Bearer ${token()}`} } */);
    return data;
}

export const getVrsteProizvoda = async () => {
    const data = await axios.get('https://localhost:44318/api/vrsteProizvoda/'/* , { headers: {"Authorization" : `Bearer ${token()}`} } */);
    return data;
}

/* export const getBooksByTitle = async (title) => {
    const data = await axios.get('http://localhost:8083/book-store/books/?book_title=' + title, { headers: {"Authorization" : `Bearer ${token()}`} });
    return data;
} */


export const updateVrstaProizvoda = async (vrstaProizvoda) => {
    return await axios.put('https://localhost:44318/api/vrsteProizvoda/', vrstaProizvoda/* , { headers: {"Authorization" : `Bearer ${token()}`} } */);
}

export const createVrstaProizvoda = async (vrstaProizvoda) => {
    return await axios.post('https://localhost:44318/api/vrsteProizvoda/' , vrstaProizvoda/* , { headers: {"Authorization" : `Bearer ${token()}`} } */);
}

export const deleteVrstaProizvoda = async (id) => {
    return await axios.delete('https://localhost:44318/api/vrsteProizvoda/' + id/* , { headers: {"Authorization" : `Bearer ${token()}`} } */);
}