import React, {Component} from "react";
import {variables} from './variables.js';

export class TipProizvoda extends Component{
    constructor(props){
        super(props);

        this.state={
            tipoviProizvoda:[],
            modalTitle: "",
            tipProizvodaId:0,
            nazivTipProizvoda: ""
  
        };
    }

    refreshList(){
        fetch(variables.API_URL+'tipoviProizvoda')
        .then(response=>response.json())
        .then(data=>{
            this.setState({tipoviProizvoda:data});
        });
    }
    componentDidMount(){
        this.refreshList();
    }
    changenazivTipProizvoda =(e)=>{
        this.setState({nazivTipProizvoda:e.target.value});
    }
    changetipProizvodaId =(e)=>{
        this.setState({tipProizvodaId:e.target.value});
    }

    addClick(){
        this.setState({
            modalTitle:"Dodaj tip proizvoda",
            tipProizvodaId:0,
            nazivTipProizvoda:""
        });
    }
    editClick(pro){
        this.setState({
            modalTitle:"Izmeni tip proizovda",
            nazivTipProizvoda: pro.nazivTipProizvoda,  
            tipProizvodaId: pro.tipProizvodaId      
        });
    }

    createClick(){
        fetch(variables.API_URL+'tipoviProizvoda',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                nazivTipProizvoda: this.state.nazivTipProizvoda
                
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

    updateClick(){
        fetch(variables.API_URL+'tipoviProizvoda',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({

                tipProizvodaId: this.state.tipProizvodaId,
                nazivTipProizvoda: this.state.nazivTipProizvoda,

                
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
            tipoviProizvoda,
            modalTitle,
            nazivTipProizvoda,
            tipProizvodaId
           
        }=this.state;

        return(
            <div>
                    <button type="button" className="btn btn-primary m-2 float-end" 
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={()=>this.addClick()}>  Dodaj tip proizvoda</button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                Naziv tipa proizvoda
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {tipoviProizvoda.map(pro =>
                        <tr key={pro.tipProizvodaId}>
                            <td>{pro.nazivTipProizvoda}</td>
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
        <span className="input-group-text">Naziv tipa proizvoda</span>
        <input type="text" className="form-control"
        value={nazivTipProizvoda}
        onChange={this.changenazivTipProizvoda}/>
       </div>

        {tipProizvodaId==0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.createClick()}
        >Kreiraj tip proizvoda</button>
        :null}

        {tipProizvodaId!=0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.updateClick()}
        >Izmeni tip proizvoda</button>
        :null}

   </div>

</div>
</div> 
</div>
            </div>
        )
    }
}


