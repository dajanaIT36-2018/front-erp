import React from 'react';
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2";
import validator from 'validator';


const SignUp = () => {
    const [korisnickoIme, setkorisnickoIme] = useState("");
    const [lozinka, setlozinka] = useState("");
    const [imeKorisnik, setimeKorisnik] = useState("");
    const [prezimeKorisnika, setprezimeKorisnika] = useState("");
    const [eMailKorisnika, seteMailKorisnika] = useState("");
    const [telefonKorisnika, settelefonKorisnika] = useState("");
    const [gradKorisnika, setgradKorisnika] = useState("");
    const [ulicaKorisnika, setulicaKorisnika] = useState ("");
    const [brUliceKorisnika, setbrUliceKorisnika] = useState ("");
    const [postanskiBroj, setpostanskiBroj] = useState("");
    const [pol, setpol] = useState("");
    const [tipKorisnikaId, settipKorisnikaId ]= useState("");
    const [isPending, setIsPending] = useState(false);
    const history = useNavigate();

    const Validate = () => {
        if (eMailKorisnika === "" || korisnickoIme === "" || lozinka === "" || telefonKorisnika === ""
            || imeKorisnik === "" || prezimeKorisnika === "" || gradKorisnika === "") {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'All inputs must be filled!',
            });
            return false;
        }
        else if (telefonKorisnika.length < 10 || telefonKorisnika.length>20) {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Phone number must have more than 10 and less than 20 digits!',
            });
            return false;
        }
       /*  else if (!validator.iseMailKorisnika(eMailKorisnika)) {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Enter valid eMailKorisnika adress!',
            });
            return false;
        } */
        return true;
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!Validate())
            return;
        setIsPending(true);
        const signUp = {
            "korisnickoIme": korisnickoIme,
            "lozinka": lozinka,
            "eMailKorisnika": eMailKorisnika,
            "telefonKorisnika": telefonKorisnika,
            "imeKorisnik": imeKorisnik,
            "prezimeKorisnika": prezimeKorisnika,
            "gradKorisnika": gradKorisnika,
            "ulicaKorisnika":ulicaKorisnika,
            "brUliceKorisnika": brUliceKorisnika,
            "postanskiBroj":postanskiBroj,
            "pol":pol,
            "tipKorisnikaId": tipKorisnikaId




        };
        console.log(signUp);
        axios.post('https://localhost:44318/api/korisnici', signUp).then(res => {
            if (res.status === 201) {
                setIsPending(false);
                Swal.fire({
                    icon: 'success',
                    title: 'Congrats...',
                    text: "Registration has been successfull, please log in!"
                });
                history('/');
            } else {
                setIsPending(false);
                console.log(res.response.data.message);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: res.data.response.message,
                });
            }
        }).catch((error) => {
            if( error.response ){
                setIsPending(false);
                console.log(error.response.data.message);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.response.data.message,
                });
            }
        });;
    }

    return (
        <div className="div-signUp">
            <form style={{ maxWidth: "50%", margin: "auto" }}>
            <div className="mb-3">
                    <label className="form-label">Ime </label>
                    <input value={imeKorisnik} onChange={(e) => setimeKorisnik(e.target.value)} required type="string" className="form-control" id="InputimeKorisnik" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Prezime</label>
                    <input value={prezimeKorisnika} onChange={(e) => setprezimeKorisnika(e.target.value)} required type="string" className="form-control" id="InputprezimeKorisnika" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Grad</label>
                    <input value={gradKorisnika} onChange={(e) => setgradKorisnika(e.target.value)} required type="=string" className="form-control" id="InputgradKorisnika" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Ulica</label>
                    <input value={ulicaKorisnika} onChange={(e) => setulicaKorisnika(e.target.value)} required type="string" className="form-control" id="InputulicaKorisnika" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Broj ulice</label>
                    <input value={brUliceKorisnika} onChange={(e) => setbrUliceKorisnika(e.target.value)} required type="number" className="form-control" id="InputbrUliceKorisnika" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Postanski broj</label>
                    <input value={postanskiBroj} onChange={(e) => setpostanskiBroj(e.target.value)} required type="number" className="form-control" id="InputpostanskiBroj" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Pol</label>
                    <input value={pol} onChange={(e) => setpol(e.target.value)} required type="string" className="form-control" id="Inputpol" />
                </div>
                <div className="mb-3">
                    <label className="form-label">eMailKorisnika</label>
                    <input value={eMailKorisnika} onChange={(e) => seteMailKorisnika(e.target.value)} required type="string" className="form-control" id="InputeMailKorisnika" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Telefonski broj</label>
                    <input value={telefonKorisnika} onChange={(e) => settelefonKorisnika(e.target.value)} required type="string" className="form-control" id="InputtelefonKorisnika" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Korisnicko ime</label>
                    <input value={korisnickoIme} onChange={(e) => setkorisnickoIme(e.target.value)} required type="string" className="form-control" id="InputkorisnickoIme" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Lozinka</label>
                    <input value={lozinka} onChange={(e) => setlozinka(e.target.value)} required type="lozinka" className="form-control" id="Inputlozinka" />
                </div>

                <div className="mb-3">
                    <label className="form-label">Tip </label>
                    <input value={tipKorisnikaId} onChange={(e) => settipKorisnikaId(e.target.value)} required type="number" className="form-control" id="InputtipKorisnikaId" />
                </div>
                
                <div className="mb-3">
                    {!isPending && <span className="right">
                        <Link to="#" onClick={(e) => onSubmit(e)} type="submit" className="btn btn-primary">Sign Up</Link>
                    </span>}
                    {isPending && <label>Signing up...</label>}
                </div>
            </form>
        </div>
    );
}

export default SignUp;