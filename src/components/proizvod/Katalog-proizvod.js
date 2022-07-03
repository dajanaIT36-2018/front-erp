//import { role } from "../../services/auth-service";
import { React, useState, useEffect} from 'react';
import { useNavigate} from 'react-router-dom';
import Swal from "sweetalert2";
import Sweetpagination from "sweetpagination";
import { getProizvodi } from '../../services/proizvod-service';



const Katalog = ({title}) => {

    const navigate = useNavigate();
    //const [loged, setLoged] = useState({});
    //const [user, setUser] = useState({});
    const [velicina, SetVelicina] = useState("");
    const [proizvodi, setProizvodi] = useState([]);
    const [currentPageData, setCurrentPageData] = useState([]);

/*     useEffect( () => {
        if(localStorage.getItem('accessToken') !== null)
            getUserRole();
            fetchData();
   },[]); */

    /* const coursesPage = (id) => {
       navigate('proizvodi/'+ id);
    } */

    /* const getUserRole = () => {
        role().then(user => {
            setLoged(true);
            setUser(user.role.authority);
        });
    } */

    const fetchData = async () => {
        const proizvodiList = await getProizvodi();
        setProizvodi(proizvodiList.data);
    }

    /* const sortBooks  = () => {
       const sortedData = [...books].sort((a,b) => {
            return a.price>b.price ? 1 : -1
       })
       setBooks(sortedData);
    } */
    /* const filterBooksByTitle  = async () => {
        console.log(boookTitle);
        if(boookTitle === "")
        {
            const booklist = await getBooks();
            setBooks(booklist.data);
        }
        else{
        const newData = await getBooksByTitle(boookTitle);
        setBooks(newData.data);
        console.log(newData);
        }
     } */

     const updateProizvod  = (id) => {
        navigate("/noviProizvod/"+id);
    } 
    /* const deleteBookB = async (id) => {
        deleteBook(id).then(res => {
            if (res.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Sucess',
                    text: "Book successfully deleted",
                });
                fetchData();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: res.data.error,
                });
            }
        }).catch((error) => {
            if( error.response ){
                console.log(error.response.data.message);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.response.data.message,
                });
            }
        });
    } */

    return (  
        <div className="proizvodi-list">
           
           
            <h2>{title}</h2>
            {currentPageData.map(proizvod => (
                <div className="blog-preview" key={proizvod.proizvodId} >
                    <h2>{proizvod.velicina}</h2>
                    <p>{proizvod.proizvodjac.nazivProizvodjaca}</p>
                    <p>Cena proizvoda: {proizvod.cenaProizvoda}$</p>
                    <br />

                    <br />

                </div>
      ))}
      <Sweetpagination
        currentPageData={setCurrentPageData}
        dataPerPage={2}
        getData={proizvodi}
        navigation={true}
      />
        </div>
    );
}

export default Katalog;