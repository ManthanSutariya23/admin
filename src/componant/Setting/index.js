import { useState } from "react";
import axios from 'axios';
import validator from 'validator';

function Setting({ data, fetchData }) {

    let [isResult, setResult] = useState(data.isresult);
    let [title, setTitle] = useState(data.title);
    let [agreement, setAgreement] = useState(data.agreement);
    let [oldPassword, setOldPassword] = useState();
    let [newPassword, setNewPassword] = useState();
    let [showPassword, setShowPassword] = useState(false);

    let [error, setError] = useState();
    let [passMsg, setPassMsg] = useState();
    let [passUpdate, setPassUpdate] = useState(false);
    let [titleUpdate, setTitleUpdate] = useState(false);
    let [agreementUpdate, setAgreementUpdate] = useState(false);
    let [passCri, setPassCri] = useState(false);




    const id = data._id;

    function handleUpdateTitle(e) {
        e.preventDefault();
        axios.put("http://localhost:8080/client/title", {
            id: id,
            title: title
        }).then((data) => {
            setTitleUpdate(true)
            fetchData();
            console.log(data.data);
        })
            .catch(err => {
                console.log(err.response.data.error);
            })
    }

    function handleUpdateResult(result) {
        axios.put("http://localhost:8080/client/result", {
            id: id,
            isresult: result
        }).then((data) => {
            fetchData();
            setResult(result);
            console.log(data.data);
        })
            .catch(err => {
                console.log(err.response.data.error);
            })
    }

    function handleUpdateAgreement(e) {
        e.preventDefault();
        axios.put("http://localhost:8080/client/agreement", {
            id: id,
            agreement: agreement
        }).then((data) => {
            setAgreementUpdate(true)
            fetchData();
            console.log(data.data);
        })
            .catch(err => {
                console.log(err.response.data.error);
            })
    }

    const validate = (value) => {

        if (validator.isStrongPassword(value, {
            minLength: 8, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 1,
        })) {
            setPassMsg('Is Strong Password');
            setPassCri(true);
        } else {
            setPassMsg('Is Not Strong Password');
            setPassCri(false);
        }
    }

    function handleUpdatePassword(e) {
        e.preventDefault();
        if (data.password === oldPassword) {
            if (oldPassword !== newPassword) {
                if (passCri) {
                    axios.put("http://localhost:8080/client/password", {
                        id: id,
                        password: newPassword
                    }).then((data) => {
                        setError('');
                        setNewPassword('')
                        setOldPassword('')
                        setPassMsg('')
                        fetchData();
                        setPassUpdate(true);
                    })
                        .catch(err => {
                            console.log(err.response.data.error);
                        })
                } else {
                    setError('New Password is not Match with Password Criteria')
                }
            } else {
                setError('Old Password and New Password is same')
            }
        } else {
            console.log(newPassword)
            setError('Please Enter Correct Current Password')
        }
    }

    return (

        <div className="page-wrapper">
            <div className="page-breadcrumb">
                <div className="container-fluid row">
                    <div className="col-12 d-flex no-block align-items-center">
                        <h4 className="page-title">Setting</h4>
                    </div>
                </div>

                <br />

                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-md-10">
                        <div className="card">
                            <form className="form-horizontal" onSubmit={handleUpdateTitle}>
                                <div className="card-body">
                                    <h4 className="card-title">Title</h4>
                                    <div className="form-group row">
                                        <div className="col-md-12">
                                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" id="title" placeholder="Title" required />
                                        </div>
                                    </div>
                                    {titleUpdate && (<div className="alert alert-success" role="alert">
                                        Title has been updated
                                    </div>)}
                                </div>
                                <div className="border-top">
                                    <div className="card-body">
                                        <button type="submit" className="btn btn-primary">
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-md-10">
                        <div className="card">
                            <form className="form-horizontal">
                                <div className="card-body">
                                    <h4 className="card-title">Result</h4>
                                    <div className="form-check form-switch">
                                        {isResult
                                            ? (<input onChange={() => { handleUpdateResult(isResult = !isResult) }} className="form-check-input" style={{ borderRadius: '20px', cursor: 'pointer' }} type="checkbox" role="switch" id="result" checked />)
                                            : (<input onChange={() => { handleUpdateResult(isResult = !isResult) }} className="form-check-input" style={{ borderRadius: '20px', cursor: 'pointer' }} type="checkbox" role="switch" id="result" />)}
                                        &nbsp;&nbsp;
                                        <label className="form-check-label" htmlFor="result">Do you want to show result after voting to user ?</label>
                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-md-10">
                        <div className="card">
                            <form className="form-horizontal" method="post" onSubmit={handleUpdateAgreement}>
                                <div className="card-body">
                                    <h4 className="card-title">Agreement</h4>

                                    <div className="form-group row">
                                        <div className="col-md-12">
                                            <textarea value={agreement} onChange={(e) => setAgreement(e.target.value)} placeholder="Write Agreement Here" rows={10} className="form-control" defaultValue={""} />
                                        </div>
                                    </div>
                                    {agreementUpdate && (<div className="alert alert-success" role="alert">
                                        Agreement has been updated
                                    </div>)}
                                </div>
                                <div className="border-top">
                                    <div className="card-body">
                                        <button type="submit" className="btn btn-primary">
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-md-10">
                        <div className="card">
                            <form className="form-horizontal" method="post" onSubmit={handleUpdatePassword}>
                                <div className="card-body">
                                    <h4 className="card-title">Reset Password</h4>
                                    <div className="form-group row">
                                        <div className="col-md-12">
                                            <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className="form-control" id="cpassword" placeholder="Current Password" />
                                        </div>
                                    </div>

                                    <div className="form-group row mb-0">
                                        <div className="col-md-12">
                                            <input type="password" value={newPassword} onChange={(e) => { setNewPassword(e.target.value); validate(e.target.value) }} className="form-control" id="npassword" placeholder="New Password" />
                                        </div>
                                        <div className="col-md-12">
                                            <p className="m-0 mt-2" onClick={() => setShowPassword(showPassword = !showPassword)} style={{ color: '#6352ca', cursor: 'pointer' }}>{showPassword ? 'Hide' : 'Show'} password</p>
                                            {showPassword ? <span>{newPassword}</span> : ''} <br />
                                        </div>
                                        {passMsg === '' ? null :
                                            <p className="mt-1 mb-1" style={{
                                                fontWeight: 'bold',
                                            }}>
                                                {passMsg}
                                            </p>}
                                        <p className="m-0">NOTE: Password must contain following letters:
                                            <ul>
                                                <li>one digit from 1 to 9</li>
                                                <li>one lowercase letter</li>
                                                <li>one uppercase letter</li>
                                                <li>one special character</li>
                                                <li>it must be 8-16 characters long.</li>
                                            </ul>
                                        </p>
                                        <span className="error">{error}</span>
                                        {passUpdate && (<div className="alert alert-success" role="alert">
                                            Password has been updated
                                        </div>)}

                                    </div>

                                </div>
                                <div className="border-top">
                                    <div className="card-body">
                                        <button type="submit" className="btn btn-primary">
                                            Update
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Setting;
