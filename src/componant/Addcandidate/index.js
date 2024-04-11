import { useEffect, useState } from "react";
import axios from 'axios';
import createToken from "../Comman/create_token";


function Addcandidate() {

    let [ballotData, setBallotData] = useState();
    let [isBallotData, setIsBallotData] = useState(false);


    let [ballot, setBallot] = useState('');
    let [fname, setFname] = useState('');
    let [email, setEmail] = useState('');
    let [lname, setLname] = useState('');
    let [description, setDescription] = useState('');
    let [profile, setProfile] = useState('');
    let [error, setError] = useState('');


    function handleGetBallotBallot() {
        setIsBallotData(false);
        axios.post("http://localhost:8080/ballot/getballot", {
            "client_id": localStorage.getItem('token')
        }).then((data) => {
            setBallotData(data.data);
            setIsBallotData(true);
            // console.log(data.data);
        })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        handleGetBallotBallot()
    }, [])

    function handleSubmit(e) {
        e.preventDefault();
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let newPassword = '';
        for (let i = 0; i < 12; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            newPassword += charset[randomIndex];
        }
        if (profile) {
            if (ballot) {
                axios.post("http://localhost:8080/candidate", {
                    client_id: localStorage.getItem('token'),
                    ballot_id: ballot,
                    email: email,
                    password: newPassword,
                    fname: fname,
                    lname: lname,
                    photo: profile,
                    status: true,
                    description: description,
                }).then((data) => {
                    createToken(email, newPassword)
                    setBallot('')
                    setFname('')
                    setEmail('')
                    setLname('')
                    setDescription('')
                    setProfile('')
                    setError('')
                })
                    .catch(err => {
                        setError(err.response.data.error);
                    })
            } else {
                setError('Select Ballot');
            }
        } else {
            setError('Unvalid Profile Picture')
        }
    }

    function covertToBase64(e) {
        var reader = new FileReader();
        if (e.target.files.length > 0) {
            setError('');
            if ((e.target.files[0].size / 1024) < 1024) {
                setError('');
                reader.readAsDataURL(e.target.files[0])
                reader.onload = () => {
                    // console.log(reader.result);
                    setProfile(reader.result);
                }
                reader.onerror = error => console.log("Error: ", error);
            } else {
                setError('Image is too large')
            }
        } else {
            setProfile('');
            setError('Please Select Image')
        }
    }

    return (
        <div className="page-wrapper">
            <div className="page-breadcrumb">
                <div className="container-fluid row">
                    <div className="col-12 d-flex no-block align-items-center">
                        <h4 className="page-title">Add Candidate</h4>
                    </div>
                </div>

                <br />
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <div className="card">
                            <form className="form-horizontal" method="post" onSubmit={handleSubmit}>
                                <div className="card-body">
                                    <h4 className="card-title">Candidate Info</h4>
                                    <div className="form-group row">
                                        <label htmlFor="fname" className="col-sm-3 text-end control-label col-form-label">First Name</label>
                                        <div className="col-sm-9">
                                            <input type="text" value={fname} onChange={(e) => setFname(e.target.value)} name="fname" className="form-control" id="fname" placeholder="First Name Here" required />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="lname" className="col-sm-3 text-end control-label col-form-label">Last Name</label>
                                        <div className="col-sm-9">
                                            <input type="text" value={lname} onChange={(e) => setLname(e.target.value)} name="lname" className="form-control" id="lname" placeholder="Last Name Here" required />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="email" className="col-sm-3 text-end control-label col-form-label">Email</label>
                                        <div className="col-sm-9">
                                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" className="form-control" id="email" placeholder="Email Here" required />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="ballot" className="col-sm-3 text-end control-label col-form-label">Ballot</label>
                                        <div className="col-md-9">
                                            <select name="ballot_id" value={ballot} onChange={(e) => setBallot(e.target.value)} className="select2 form-select shadow-none select2-hidden-accessible" style={{ width: '100%', height: '36px' }} data-select2-id={1} tabIndex={-1} aria-hidden="true">

                                                {isBallotData ? (<>
                                                    <option data-select2-id={17}>Select Ballot</option>
                                                    {ballotData.map((item) => {
                                                        return <option value={item._id} data-select2-id={17}>{item.ballot_name}</option>
                                                    })}
                                                </>) : (<option data-select2-id={3}>Loding..</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="cono1" className="col-sm-3 text-end control-label col-form-label">Decscription</label>
                                        <div className="col-sm-9">
                                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} name="description" className="form-control" defaultValue={""} />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 text-end control-label col-form-label">Profile</label>
                                        <div className="col-md-9">
                                            <div className="custom-file">
                                                <input type="file" accept="image/*" onChange={covertToBase64} className="custom-file-input" id="validatedCustomFile" required />
                                                <div className="invalid-feedback">
                                                    Example invalid custom file feedback
                                                </div>
                                            </div>
                                            <p className="mt-1 mb-0">Max File size is 1 MB</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label className="col-sm-3 text-end">{profile ? ('Preview: ') : ''}</label>
                                        <div className="col-md-9">
                                            {profile ? <img src={profile} alt="Profile" width={100} height={100} /> : ''}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label className="col-sm-3"></label>
                                        <div className="col-md-9">
                                            <p className="error">{error}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-top">
                                    <div className="card-body">
                                        <button type="submit" className="btn btn-primary">
                                            Submit
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

export default Addcandidate;
