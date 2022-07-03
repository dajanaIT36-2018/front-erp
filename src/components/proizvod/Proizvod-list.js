import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {TableContainer,Table,TableHead,TableBody,TableRow,TableCell,Paper,Button} from "@mui/material"
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getProizvodi, deleteProizvod } from '../../services/proizvod-service';
import ProizvodForm from './Proizvod-form';

const ProizvodList = () => {

    const navigate = useNavigate();
    const [proizvodi, setProizvodi] = useState([]);
   

    var randomString = require("random-string");
    const [open, setOpen] = React.useState(false);

    const updateProizvod  = (id) => {
        navigate("/newProizvod/" + id);
    }
    const deleteProizvodD = async (id) => {
        deleteProizvod(id).then(res => {
            if (res.status === 204) {
                Swal.fire({
                    icon: 'success',
                    title: 'Sucess',
                    text: "Proizvod uspesno obrisan",
                });
                window.location.reload();
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
    }
    useEffect(() => {
        getProducts();
    },[]);

    const getProducts = async () => {
        const result = await getProizvodi();
        const data = await result.data;
       
      // console.log(data)
        setProizvodi(data)
    };


        return (<div>
            <h2>Proizvodi</h2>
            <Button variant="outlined" onClick={() => navigate("/newProizvod/")}>
            Novi proizvod
          </Button>
            <TableContainer component="Paper">
           <Table aria-label='tbl'>
               <TableHead>
               <TableCell>Velicina</TableCell>
               <TableCell>Cena</TableCell>
               <TableCell>Kolicina</TableCell>
               <TableCell>Popust</TableCell>
               <TableCell>Slika</TableCell>
               <TableCell>Proizvodjac</TableCell>
               <TableCell>Tip proizvoda</TableCell>
               <TableCell>Vrsta proizvoda</TableCell>
    
              
         
           
               </TableHead>
            
               <TableBody>
                   {proizvodi?.map((proizvod)=>(
                       <TableRow key={proizvod.proizvodId}>
                           <TableCell>{proizvod.velicina}</TableCell>
                           <TableCell>{proizvod.cena}</TableCell>
                           <TableCell>{proizvod.kolicina}</TableCell>
                           <TableCell>{proizvod.popust}</TableCell>
                           <TableCell>{proizvod.slika}</TableCell>
                           <TableCell>{proizvod.proizvodjac.nazivProizvodjaca}</TableCell>
                           <TableCell>{proizvod.tipProizvoda.nazivTipProizvoda}</TableCell>
                           <TableCell>{proizvod.vrstaProizvoda.nazivVrsteProizvoda}</TableCell>
                           <TableCell> {<button  className="btn btn-light mr-1" onClick={() => updateProizvod(proizvod.proizvodId)}>Izmeni 
                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                   <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                   <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                   </svg>
                           </button>}</TableCell>
                           <TableCell> {<button  className="btn btn-light mr-1" onClick={() => deleteProizvodD(proizvod.proizvodId)}>Obrisi 
                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                   <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                   <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                    </svg>
                          </button>}</TableCell>
                          
                       </TableRow>
                   ))}
                   
               </TableBody>
               
           </Table>
            </TableContainer>
         
            
                
                
            </div>)
            
    }
    
    export default ProizvodList