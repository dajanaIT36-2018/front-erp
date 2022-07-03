import React, {Component} from "react";
import {variables} from './variables.js';

export class Korisnici extends Component{
    constructor(props){
        super(props);

        this.state={
            korisnici:[],
            korisnikId:0,
            imeKorisnik:"",
            prezimeKorisnika: "",
            telefonKorisnika: "",
            emailKorisnika: "",
            gradKorisnika:"",
            ulicaKorisnika:"",
            brUliceKorisnika: "",
            postanskiBroj:"",
            pol: "",

            imeKorisnikFilter:"",
            prezimeKorisnikaFilter: "",
            gradKorisnikaFilter:"",
            ulicaKorisnikaFilter: "",
            polFilter:"",
            korisniciiWithoutFilter:[]

  
        };
    }

    FilterFn(){
        var imeKorisnikFilter=this.state.popustFilter;
        var prezimeKorisnikFilter=this.state.velicinaFilter;
        var gradKorisnikFilter=this.state.kolicinaFilter;
        var ulicaKorisnikaFilter= this.state.ulicaKorisnikaFilter;
        var polFilter= this.state.polFilter;
  

        var filteredData=this.state.proizvodiWithoutFilter.filter(
            function(pro){
                return pro.imeKorisnik.toString().toLowerCase().includes(
                   imeKorisnikFilter.toString().trim().toLowerCase()
                )&&
                pro.prezimeKorisnika.toString().toLowerCase().includes(
                    prezimeKorisnikFilter.toString().trim().toLowerCase()
                )
                &&
                pro.gradKorisnika.toString().toLowerCase().includes(
                    gradKorisnikFilter.toString().trim().toLowerCase()
                )
                &&
                pro.ulicaKorisnika.toString().toLowerCase().includes(
                    ulicaKorisnikaFilter.toString().trim().toLowerCase()
                )
                &&
                pro.pol.toString().toLowerCase().includes(
                    polFilter.toString().trim().toLowerCase()
                )

            }
        );

        this.setState({korisnici:filteredData});

    }

    changeimeKorisnikFilter = (e)=>{
        this.state.imeKorisnikFilter=e.target.value;
        this.FilterFn();
    }
    changeprezimeKorisnikaFilter = (e)=>{
        this.state.prezimeKorisnikaFilter=e.target.value;
        this.FilterFn();
    }
    changegradKorisnikaFilter = (e)=>{
        this.state.gradKorisnikaFilter=e.target.value;
        this.FilterFn();
    }
    changeulicaKorisnikaFilter = (e)=>{
        this.state.ulicaKorisnikaFilter=e.target.value;
        this.FilterFn();
    }
    changepolFilter = (e)=>{
        this.state.polFilter=e.target.value;
        this.FilterFn();
    }

    

    refreshList(){
        fetch(variables.API_URL+'korisnici')
        .then(response=>response.json())
        .then(data=>{
            this.setState({korisnici:data});
        });
    }
    componentDidMount(){
        this.refreshList();
    }
    addClick(){
        this.setState({
            korisnikId:0,
            imeKorisnik:"",
            prezimeKorisnika: "",
            telefonKorisnika: "",
            emailKorisnika: "",
            gradKorisnika:"",
            ulicaKorisnika:"",
            brUliceKorisnika:0,
            postanskiBroj:"",
            pol: ""
        });
    }
    render(){
        const {
            korisnici,

           
        }=this.state;

        return(
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                            <input className="form-control m-2" onChange={this.changeimeKorisnikFilter} placeholder="Filter"/>
                               Ime
                            </th>
                            <th>
                            <input className="form-control m-2" onChange={this.changeprezimeKorisnikaFilter} placeholder="Filter"/>
                                Prezime
                            </th>
                            <th>
                               Telefon
                            </th>
                            <th>
                               eMail
                            </th>
                            <th>
                            <input className="form-control m-2" onChange={this.changegradKorisnikaFilter} placeholder="Filter"/>
                               Grad
                            </th>
                            <th>
                            <input className="form-control m-2" onChange={this.changeulicaKorisnikaFilter} placeholder="Filter"/>
                               Ulica
                            </th>
                            <th>
                               Broj
                            </th>
                            <th>
                               Postancki br
                            </th>
                            <th>
                            <input className="form-control m-2" onChange={this.changepolFilter} placeholder="Filter"/>
                               Pol
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {korisnici.map(pro =>
                        <tr key={pro.korisnikId}>
                            <td>{pro.imeKorisnik}</td>
                            <td>{pro.prezimeKorisnika}</td>
                            <td>{pro.telefonKorisnika}</td>
                            <td>{pro.eMailKorisnika}</td>
                            <td>{pro.gradKorisnika}</td>
                            <td>{pro.ulicaKorisnika}</td>
                            <td>{pro.brUliceKorisnika}</td>
                            <td>{pro.postanskiBroj}</td>
                            <td>{pro.pol}</td>
                        </tr>)
                        }
                    </tbody>
                </table>
</div>

        )
    }
}


