import React, {Component} from "react";
import {variables} from './variables.js';

export class Proizvod extends Component{
    constructor(props){
        super(props);

        this.state={
            proizvodi:[],
            proizvodjaci: [],
            tipoviProizvoda: [],
            vrsteProizvoda: [],
            modalTitle: "",
            proizvodId:0,
            velicina: 0,
            cena: 0,
            kolicina: 0,
            slika:"", 
            popust:0,


            proizvodjac: "",
            proizvodjacId:0,

            tipProizvodaId:0,
            tipProizvoda: "",

            vrstaProizvodaId: 0,
            vrstaProizvoda: "",

            // nazivProizvodjacaFilter:"",
            // nazivTipProizvodaFilter:"",
            // nazivVrsteProizvodaFilter: "",
            
            velicinaFilter:0,
            kolicinaFilter: 0,
            popustFilter: 0,
            proizvodiWithoutFilter:[],
  
        };
    }

    FilterFn(){
        var velicinaFilter=this.state.velicinaFilter;
        var kolicinaFilter=this.state.kolicinaFilter;
        var popustFilter=this.state.popustFilter;
        // var nazivProizvodjacaFilter= this.state.nazivProizvodjacaFilter;
        // var nazivVrsteProizvodaFilter=this.state.nazivVrsteProizvodaFilter;
        // var nazivTipProizvodaFilter=this.state.nazivTipProizvodaFilter;

        var filteredData=this.state.proizvodiWithoutFilter.filter(
            function(pro){
                return pro.velicina.toString().toLowerCase().includes(
                    velicinaFilter.toString().trim().toLowerCase()
                )&&
                pro.kolicina.toString().toLowerCase().includes(
                    kolicinaFilter.toString().trim().toLowerCase()
                )&&
                pro.popust.toString().toLowerCase().includes(
                    popustFilter.toString().trim().toLowerCase()
                 )
                // &&
                // pro.nazivTipProizvoda.toString().toLowerCase().includes(
                //     nazivTipProizvodaFilter.toString().trim().toLowerCase()
                // )
                // &&
                // pro.nazivProizvodjaca.toString().toLowerCase().includes(
                //     nazivProizvodjacaFilter.toString().trim().toLowerCase()
                // )
                // &&
                // pro.nazivVrsteProizvoda.toString().toLowerCase().includes(
                //     nazivVrsteProizvodaFilter.toString().trim().toLowerCase()
                // )
            }
        );

        this.setState({proizvodi:filteredData});

    }


    changevelicinaFilter = (e)=>{
        this.state.velicinaFilter=e.target.value;
        this.FilterFn();
    }
    changekolicinaFilter = (e)=>{
        this.state.kolicinaFilter=e.target.value;
        this.FilterFn();
    }
    changepopustFilter = (e)=>{
        this.state.popustFilter=e.target.value;
        this.FilterFn();
    }
    // changenazivTipProizvodaFilter = (e)=>{
    //     this.state.nazivTipProizvodaFilter=e.target.value;
    //     this.FilterFn();
    // }
    // changenazivVrsteProizvodaFilter = (e)=>{
    //     this.state.nazivVrsteProizvodaFilter=e.target.value;
    //     this.FilterFn();
    // }
    // changenazivProizvodjacaFilter = (e)=>{
    //     this.state.nazivProizvodjacaFilter=e.target.value;
    //     this.FilterFn();
    // }


    refreshList(){

        fetch(variables.API_URL+'proizvodi')
        .then(response=>response.json())
        .then(data=>{
            this.setState({proizvodi:data, proizvodiWithoutFilter:data});
        });

        fetch(variables.API_URL+'proizvodjaci')
        .then(response=>response.json())
        .then(data=>{
            this.setState({proizvodjaci:data});
        });

       fetch(variables.API_URL+'tipoviProizvoda')
    .then(response=>response.json())
    .then(data=>{
    this.setState({tipoviProizvoda:data});
    });

    fetch(variables.API_URL+'vrsteProizvoda')
     .then(response=>response.json())
    .then(data=>{
    this.setState({vrsteProizvoda:data});
     }); 
    }
    componentDidMount(){
        this.refreshList();
    }
    changevelicina =(e)=>{
        this.setState({velicina:e.target.value});
    }
    changecena =(e)=>{
        this.setState({cena:e.target.value});
    }
    changeslika =(e)=>{
        this.setState({slika:e.target.value});
    }
    changekolicina =(e)=>{
        this.setState({kolicina:e.target.value});
    }
    changepopust =(e)=>{
        this.setState({popust:e.target.value});
    }
    changeproizvodjac =(e)=>{
        this.setState({proizvodjac:e.target.value});
        this.state.proizvodjacId= this.state.proizvodjaci.map(pro => <option key={pro.proizvodjacId}>

            {pro.proizvodjacId}

        </option>)
    }
    changevrstaProizvoda =(e)=>{
      this.setState({vrstaProizvoda:e.target.value});
      this.state.vrstaProizvodaId= this.state.vrsteProizvoda.map(pro => <option key={pro.vrstaProizvodaId}>

        {pro.vrstaProizvodaId}

    </option>)
    }
     changetipProizvoda =(e)=>{
       this.setState({tipProizvoda:e.target.value});
       this.state.tipProizvodaId= this.state.tipoviProizvoda.map(pro => <option key={pro.tipProizvodaId}>

        {pro.tipProizvodaId}

    </option>)
    } 

    addClick(){
        this.setState({
            modalTitle:"Dodaj proizvod",
            proizvodId:0,
            velicina:0,
            cena:0,
            kolicina:0,
            slika:"", 
            popust: 0,
            proizvodjac: "",
            tipProizvoda: "",
            vrstaProizvoda: ""
        });
    }
    editClick(pro){
        this.setState({
            modalTitle:"Izmeni proizovd",
            proizvodId:pro.proizvodId,
            velicina:pro.velicina,
            cena:pro.cena,
            kolicina:pro.kolicina,
            slika: pro.slika,
            popust:pro.popust,
            proizvodjac:pro.proizvodjac,
            tipProizvoda:pro.tipProizvoda,
            vrstaProizvoda:pro.vrstaProizvoda
        
        });
    }

    createClick(){
        console.log(this.state.proizvodjacId)
        fetch(variables.API_URL+'proizvodi',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                
                velicina:this.state.velicina,
                cena:this.state.cena,
                kolicina:this.state.kolicina,
                popust:this.state.popust,
                slika:this.state.slika,
                proizvodjacId:parseInt(this.state.proizvodjacId),
                tipProizvodaId: parseInt(this.state.tipProizvodaId),
                vrstaProizvodaId:parseInt(this.state.vrstaProizvodaId)
                
            })
           
        })
        
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            console.log(result)
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }

    updateClick(){
        fetch(variables.API_URL+'proizvodi',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                proizvodId:this.state.proizvodId,
                velicina:this.state.velicina,
                cena:this.state.cena,
                kolicina:this.state.kolicina,
                popust:this.state.popust,
                slika:this.state.slika,
                proizvodjac:this.state.proizvodjac,
                tipProizvoda: this.state.tipProizvoda,
                vrstaProizvoda:this.state.vrstaProizvoda
                
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }
    render(){
        const {
            proizvodi,
            proizvodjaci,
            tipoviProizvoda,
            vrsteProizvoda,
            modalTitle,
            proizvodId,
            velicina,
            cena,
            kolicina,
            slika, 
            popust,
            proizvodjac,
            vrstaProizvoda,
            tipProizvoda
  
        }=this.state;

        return(
            <div>
                    <button type="button" className="btn btn-primary m-2 float-end" 
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={()=>this.addClick()}>  Dodaj proizvod</button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                ID
                            </th>
                            <th>
                            <input className="form-control m-2" onChange={this.changevelicinaFilter} placeholder="Filter"/>
                                Velicina
                            </th>
                            <th>
                                Cena
                            </th>
                            <th>
                            <input className="form-control m-2" onChange={this.changekolicinaFilter} placeholder="Filter"/>
                                Kolicina
                            </th>
                            <th>
                            <input className="form-control m-2" onChange={this.changepopustFilter} placeholder="Filter"/>
                                Popust
                            </th>
                            <th>
                                Slika
                            </th>
                            <th>
                            {/* <input className="form-control m-2" onChange={this.changenazivProizvodjacaFilter} placeholder="Filter"/> */}
                                Proizvodjac
                            </th>
                            <th>
                            {/* <input className="form-control m-2" onChange={this.changenazivTipProizvodaFilter} placeholder="Filter"/> */}
                                Tip proizvoda
                            </th>
                            <th>
                            {/* <input className="form-control m-2" onChange={this.changenazivVrsteProizvodaFilter} placeholder="Filter"/> */}
                                Vrsta proizvoda
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {proizvodi.map(pro =>
                        <tr key={pro.proizvodId}>
                            <td>{pro.proizvodId}</td>
                            <td>{pro.velicina}</td>
                            <td>{pro.cena}</td>
                            <td>{pro.kolicina}</td>
                            <td>{pro.popust}</td>
                            <td>{pro.slika}</td>
                            <td>{pro.proizvodjac.nazivProizvodjaca}</td>
                            <td>{pro.tipProizvoda.nazivTipProizvoda}</td>
                            <td>{pro.vrstaProizvoda.nazivVrsteProizvoda}</td>
                           <td>
                               <button type="button" className="btn btn-light mr-1"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                onClick={()=>this.editClick(pro)}>
                                   
                               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                               <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                               <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                               </svg>
                               </button>

                               <button type="button" className="btn btn-light mr-1">
                               
                               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                               <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                               <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                </svg>
                               </button>

                           </td> 

                        </tr>)
                        }
                    </tbody>
                </table>
                
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                   <div className="modal-header">
                      <h5 className="modal-title">{modalTitle}</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
                  </div>

                <div className="modal-body">
                  <div className="input-group mb-3">
                   <span className="input-group-text">Velicina</span>
                   <input type="text" className="form-control"
                   value={velicina}
                   onChange={this.changevelicina}/>
                  </div>

                  <div className="input-group mb-3">
        <span className="input-group-text">Cena</span>
        <input type="text" className="form-control"
        value={cena}
        onChange={this.changecena}/>
       </div>

       <div className="input-group mb-3">
        <span className="input-group-text">Kolicina</span>
        <input type="text" className="form-control"
        value={kolicina}
        onChange={this.changekolicina}/>
       </div>

       <div className="input-group mb-3">
        <span className="input-group-text">Popust</span>
        <input type="text" className="form-control"
        value={popust}
        onChange={this.changepopust}/>
       </div>

       <div className="input-group mb-3">
        <span className="input-group-text">Slika</span>
        <input type="text" className="form-control"
        value={slika}
        onChange={this.changeslika}/>
       </div>

       <div className="input-group mb-3">
            <span className="input-group-text">Proizvodjac</span>
            <select className="form-select"
            onChange={this.changeproizvodjac}
            value={proizvodjac}>
                {proizvodjaci.map(pro=><option key={pro.proizvodjacId}>
                    {pro.nazivProizvodjaca}
                </option>)}
            </select>
        </div>

        <div className="input-group mb-3">
            <span className="input-group-text">Tip proizvoda</span>
            <select className="form-select"
            onChange={this.changetipProizvoda}
            value={tipProizvoda}>
                {tipoviProizvoda.map(pro=><option key={pro.tipProizvodaId}>
                    {pro.nazivTipProizvoda}
                </option>)}
            </select>
        </div>

        <div className="input-group mb-3">
            <span className="input-group-text">Vrsta proizvoda</span>
            <select className="form-select"
            onChange={this.changevrstaProizvoda}
            value={vrstaProizvoda}>
                {vrsteProizvoda.map(pro=><option key={pro.vrstaProizvodaId}>
                    {pro.nazivVrsteProizvoda}
                </option>)}
            </select>
        </div>


        {proizvodId==0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.createClick()}
        >Kreiraj proizvod</button>
        :null}

        {proizvodId!=0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.updateClick()}
        >Izmeni proizvod</button>
        :null}

   </div>

</div>
</div> 
</div>
            </div>
        )
    }
}
