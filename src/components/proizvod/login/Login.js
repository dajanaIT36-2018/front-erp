import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Login = () => {
  const [korisnickoIme, setKorisnickoIme] = useState("");
  const [lozinka, setLozinka] = useState("");
  const [isPending, setIsPending] = useState(false);
  const history = useNavigate();

  const Validate = () => {
    if (korisnickoIme === "" || lozinka === "") {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "All inputs must be filled!",
      });
      return false;
    }
    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!Validate()) return;
    const login = {
      korisnickoIme: korisnickoIme,
      lozinka: lozinka,
    };
    setIsPending(true);
    axios
      .post("https://localhost:44318/api/login", login)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setIsPending(false);
          localStorage.setItem("accessToken", res.data);
          console.log(`localstoragetoken: ${localStorage.getItem("accessToken")}`);
          console.log(`splitovan token: ${res.data.split(".")[1]}`)
          /*const token = JSON.parse(
            atob(res.data.split(".")[1])
          ).sub;
          console.log(`token: ${token}`);*/
          history("/proizvodList");
        } else {
          setIsPending(false);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: res.data.error,
          });
        }
      })
      .catch((error) => {
        if (error.response) {
          setIsPending(false);
          console.log(error.response.data.message);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Incorrect login data, try again!",
          });
        }
      });
  };

  return (
    <div className="div-login">
      <form style={{ maxWidth: "50%", margin: "auto" }}>
        <div className="mb-3">
          <label className="form-label">korisnickoIme</label>
          <input
            value={korisnickoIme}
            onChange={(e) => setKorisnickoIme(e.target.value)}
            required
            type="text"
            className="form-control"
            id="InputKorisnickoIme"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Lozinka</label>
          <input
            value={lozinka}
            onChange={(e) => setLozinka(e.target.value)}
            required
            type="lozinka"
            className="form-control"
            id="InputLozinka"
          />
        </div>
        <div className="mb-3">
          {!isPending && (
            <span className="right">
              <Link
                to="/proizvodList"
                onClick={(e) => onSubmit(e)}
                type="submit"
                className="btn btn-primary"
              >
                Login
              </Link>
            </span>
          )}
          {isPending && <label>Logging...</label>}
        </div>
      </form>
    </div>
  );
};

export default Login;