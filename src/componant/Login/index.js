import { useState } from "react";
import axios from 'axios';

function Login() {

    let [username, setUsername] = useState('');

    let [password, setPassword] = useState('');
    let [isError, setIsError] = useState(false);

    function login(e) {
        e.preventDefault();
        console.log(username + "   " + password)
        axios.post("http://localhost:8080/admin", {
            username: username,
            password: password
        }).then((data) => {
            setIsError(false);
            localStorage.setItem("token", data.data.token);
            window.location.href = "/";
        })
            .catch(err => setIsError(true))
    }

    return (
        <div className="main-wrapper bg-dark full-height div-center">
            <div className="auth-wrapper d-flex no-block justify-content-center align-items-center">
                <div className="auth-box border-secondary ">
                    <div id="loginform">
                        <div className="text-center pt-3 pb-3">
                            <span className="db"><img src="../assets/images/logo-text.png" alt="logo" /></span>
                        </div>
                        {/* Form */}
                        <form className="form-horizontal mt-3" id="loginform" onSubmit={login}>
                            <div className="row pb-4">
                                <div className="col-12">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text bg-success text-white h-100" id="basic-addon1"><i className="mdi mdi-account fs-4" /></span>
                                        </div>
                                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control form-control-lg" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" required />
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text bg-warning text-white h-100" id="basic-addon2"><i className="mdi mdi-lock fs-4" /></span>
                                        </div>
                                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control form-control-lg" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1" required />
                                    </div>
                                    {isError ? <p className="text-white text-center">Username id and password is incorrect</p> : <></>}
                                    <div className="border-top border-secondary">
                                        <div className="">
                                            <div className="form-group">
                                                <div className="pt-3">
                                                    <button className="form-control form-control-lg btn btn-success text-white" type="submit">
                                                        Login
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
