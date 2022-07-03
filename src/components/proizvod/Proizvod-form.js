
import { React, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import { createProizvod, getProizvodById, updateProizvod } from "../../services/proizvod-service";
import { getTipoviProizvoda } from "../../services/tipProizvoda-service";
import { getProizvodjaci } from "../../services/proizvodjac-service";
import { getVrsteProizvoda } from "../../services/vrstaProizvoda-service";
//import { deleteProizvod } from "../services/proizvod-service";
import Swal from "sweetalert2";
import axios, { post } from "axios";



const ProizvodForm = () => {

    const [proizvod, setProizvod] = useState({});
    const [proizvodjaciList, setProizvodjaciList] = useState([]);
    const [tipoviProizvodaList, setTipoviproizvodaList] = useState([]);
    const [vrsteProizvodaList, setVrsteproizvodaList] = useState([]);
    const [newProizvod, setNewProizvod] = useState({});
    const [title, setTitle] = useState('Dodaj novi proizvod');
  
    //const [slikaProizvoda, setSlikaProizvoda] = useState({});

    const navigate = useNavigate();
    const id = useParams().proizvodId;
    useEffect(() => {
        fetchData();
    }, []);

    const Validate = () => {
        if (proizvod.velicina === undefined || proizvod.kolicina === undefined || proizvod.cena === undefined || proizvod.popust === undefined
            || proizvod.slika === undefined) {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'All inputs must be filled!',
            });
            return false;
        }
        return true;
    }

    const fetchData = async () => {
        try {
            
            
            const proizvodjacData = await getProizvodjaci();
            setProizvodjaciList(proizvodjacData.data);
            const tipProizvodaData = await getTipoviProizvoda();
            setTipoviproizvodaList(tipProizvodaData.data);
            const vrstaProizvodaData = await getVrsteProizvoda();
            setVrsteproizvodaList(vrstaProizvodaData.data);
            newProizvod.proizvodjacId = (1);
            newProizvod.tipProizvodaId = (1);
            newProizvod.vrstaProizvodaId=(1);
            if (id !== undefined ) {
                const proizvodData = await getProizvodById(id);
                
                setProizvod(proizvodData.data);
                
                newProizvod.proizvodjacId = (proizvodData.data.proizvodjacId);
                newProizvod.tipProizvodaId = (proizvodData.data.tipProizvodaId);
                newProizvod.vrstaProizvodaId = (proizvodData.data.vrstaProizvodaId);
                setTitle('Izmeni proizvod');
                
           }
        } catch (e) {
            console.log(e);
        }
    }



    const onChange = e => {
        
            const { name, value } = e.target;
            setProizvod(proizvod => ({
                ...proizvod,
                [name]: value


            }))
        }
    function save(event) {
        event.preventDefault();
        /* if (!Validate())
            return; */
        if (id) {
            newProizvod.proizvodId = id;
            newProizvod.velicina = proizvod.velicina;
            newProizvod.cena = proizvod.cena;
            newProizvod.kolicina = proizvod.kolicina;
            newProizvod.popust= proizvod.popust;
            newProizvod.slika = proizvod.slika;
            newProizvod.proizvodjacId = newProizvod.proizvodjacId;
            newProizvod.tipProizvodaId = newProizvod.tipProizvodaId;
            newProizvod.vrstaProizvodaId= newProizvod.vrstaProizvodaId;


            updateProizvod(newProizvod).then(res => {
                
                console.log(res);
                navigate('/');
            });
        } else {

            newProizvod.velicina = proizvod.velicina;
            newProizvod.cena = proizvod.cena;
            newProizvod.kolicina = proizvod.kolicina;
            newProizvod.popust=proizvod.popust;
            newProizvod.slika = proizvod.slika;
            newProizvod.proizvodjacId = newProizvod.proizvodjacId;
            newProizvod.tipProizvodaId = newProizvod.tipProizvodaId;
            newProizvod.vrstaProizvodaId=newProizvod.vrstaProizvodaId;
            console.log(newProizvod);
            createProizvod(newProizvod).then(res => {
                navigate('/');
            });
        }


    }


    return (
        <div className="div-login">
            {/*  user === 'Admin' && */
                <form style={{ maxWidth: "50%", margin: "auto" }}>
                    <label className="form-label">{title}</label>
                    <div className="mb-3">
                        <label className="form-label">Velicina</label>
                        <input name="velicina" value={proizvod.velicina} onChange={onChange} required type="text" className="form-control" id="InputVelicina" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Cena proizvoda</label>
                        <input name="cena" value={proizvod.cena} onChange={onChange} required type="number" className="form-control" id="InputCena" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Kolicina</label>
                        <input name="kolicina" value={proizvod.kolicina} onChange={onChange} required type="number" className="form-control" id="InputKolicina" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Popust</label>
                        <input name="popust" value={proizvod.popust} onChange={onChange} required type="number" className="form-control" id="InputPopust" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Slika</label>
                        <input name="slika" value={proizvod.slika} onChange={onChange} required type="text" className="form-control" id="InputSlika" />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Proizvodjac</label>
                        <br />

                        < select  onChange={(e) => {

                            newProizvod.proizvodjacId = (e.target.value);
                        }
                        } id="InputProizvodjac">

                            {proizvodjaciList.map((proizvodjac) => (
                                <option key={proizvodjac.proizvodjacId} value={proizvodjac.proizvodjacId}>
                                    {proizvodjac.nazivProizvodjaca}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Tip proizvoda</label>
                        <br />
                        <select  onChange={(e) => newProizvod.tipProizvodaId = (e.target.value)} id="InputTipProizvoda" >
                            {tipoviProizvodaList.map((tipProizvoda) => (
                                <option key={tipProizvoda.tipProizvodaId} value={tipProizvoda.tipProizvodaId}>{tipProizvoda.nazivTipProizvoda}</option>
                            ))}
                        </select>

                    </div>
                    <div className="mb-3">
                        <label className="form-label">Vrsta proizvoda</label>
                        <br />
                        <select  onChange={(e) => newProizvod.vrstaProizvodaId = (e.target.value)} id="InputVrstaProizvoda" >
                            {vrsteProizvodaList.map((vrstaProizvoda) => (
                                <option key={vrstaProizvoda.vrstaProizvodaId} value={vrstaProizvoda.vrstaProizvodaId}>{vrstaProizvoda.nazivVrsteProizvoda}</option>
                            ))}
                        </select>

                    </div>

                    <div className="mb-3">
                        <span className="right">
                            <Button to="#" onClick={(e) => save(e)} type="submit" className="btn btn-light mr-1">Sacuvaj proizvod</Button>
                        </span>
                    </div>
                </form>
            }
        </div>
    )

}
export default ProizvodForm;