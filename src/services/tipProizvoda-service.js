import axios from "axios";
//import { token } from "./auth-service";

export const getTipProizvodaById = async (id) => {
    const data = await axios.get('https://localhost:44318/api/tipoviProizvoda/' + id,/*  { headers: {"Authorization" : `Bearer ${token()}`} } */);
    return data;
}

export const getTipoviProizvoda = async () => {
    const data = await axios.get('https://localhost:44318/api/tipoviProizvoda/'/* , { headers: {"Authorization" : `Bearer ${token()}`} } */);
    return data;
}

/* export const getBooksByTitle = async (title) => {
    const data = await axios.get('http://localhost:8083/book-store/books/?book_title=' + title, { headers: {"Authorization" : `Bearer ${token()}`} });
    return data;
} */


export const updateTipProizvoda = async (tipProizvoda) => {
    return await axios.put('https://localhost:44318/api/tipoviProizvoda/', tipProizvoda/* , { headers: {"Authorization" : `Bearer ${token()}`} } */);
}

export const createTipProizvoda = async (tipProizvoda) => {
    return await axios.post('https://localhost:44318/api/tipoviProizvoda/' , tipProizvoda/* , { headers: {"Authorization" : `Bearer ${token()}`} } */);
}

export const deleteTipProizvoda = async (id) => {
    return await axios.delete('https://localhost:44318/api/tipoviProizvoda/' + id/* , { headers: {"Authorization" : `Bearer ${token()}`} } */);
}
