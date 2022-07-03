
import './App.css';

import { Proizvodjac } from './Proizvodjac';
import { TipProizvoda } from './TipProizvoda';
import { VrstaProizvoda } from './VrstaProizvoda';
import {Korisnici} from './Korisnici';
import SignUp from './components/proizvod/login/Registration';
import Login from './components/proizvod/login/Login';
import {BrowserRouter, Route,Routes, Switch,NavLink} from 'react-router-dom';
import ProizvodForm from  './components//proizvod/Proizvod-form';
import ProizvodList from  './components//proizvod/Proizvod-list';

//import ReactFirebaseFileUpload from './slike.js'



function App() {


  return (

  
    <BrowserRouter>
     <div className="App container">
      <h3 className="d-flex justify-content-center m-3">
        Admin stranica
      </h3>
      <nav className="navbar navbar-expand-sm bg-light navbar-dark">
        <ul className="navbar-nav">
        <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/proizvodList" >
              Proizvodi
            </NavLink>
            </li>
            <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/proizvodjac">
              Proizvodjac
            </NavLink>
            </li>
            <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/tipProizvoda">
              Tip proizvoda
            </NavLink>
            </li>
            <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/vrstaProizvoda">
              VrstaProizvoda
            </NavLink>
            </li>
            <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/korisnici">
              Korisnici
            </NavLink>
            </li>
            <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/signup">
             Registration
            </NavLink>
            </li>
            <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/login">
             Login
            </NavLink>
            </li>
            <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/katalog">
             Katalog
            </NavLink>
            </li>
{/*             <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/slika">
             Slika
            </NavLink>
            </li> */}
            </ul>    
            </nav>
   
      <Routes>

      <Route path="/proizvodList" element={ <ProizvodList/>}/>
       <Route  path="/newProizvod" element={<ProizvodForm/>}/>
      <Route  key="/proizvod" exact path="/newProizvod/:proizvodId" element={<ProizvodForm/>}/>
      <Route path='/proizvodjac' element={<Proizvodjac/>}/>
      <Route path='/tipProizvoda' element={<TipProizvoda/>}/>
      <Route path='/vrstaProizvoda' element={<VrstaProizvoda/>}/>
      <Route path="/korisnici" element={ <Korisnici/>}/>
      <Route key='/login' exact path="/login" element={<Login />}/>
      <Route key='/login' exact path="/signUp" element={<SignUp />}/>
      {/* <Route key='/slika' exact path="/slika" element={<ReactFirebaseFileUpload />}/> */}
      {/* <Route  path="/fileUpload" element={<FileUploadForm/>}/> */}
    </Routes>
   
    </div>
  </BrowserRouter>



     
  );
}

export default App;