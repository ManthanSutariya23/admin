import { useState } from "react";
import axios from 'axios';
import createToken from "../Comman/create_token";

function Addvoter() {

    let [fname, setFname] = useState('');
    let [email, setEmail] = useState('');
    let [lname, setLname] = useState('');
    let [postcode, setPostcode] = useState('');
    let [profile, setProfile] = useState('');
    let [gender, setGender] = useState('');
    let [address, setAddress] = useState('');
    let [error, setError] = useState('');
    let [recordUpdate, setRecordUpdate] = useState(false);


    function handleSubmit(e) {
        e.preventDefault();
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let newPassword = '';
        for (let i = 0; i < 12; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            newPassword += charset[randomIndex];
        }
        if (profile) {
            axios.post("http://localhost:8080/voter", {
                client_id: localStorage.getItem('token'),
                email: email,
                password: newPassword,
                fname: fname,
                lname: lname,
                photo: profile,
                address: address,
                postcode: postcode,
                gender: gender,
                approved: 1,
                approved_date: new Date().toISOString().split('T')[0],
            }).then((data) => {
                createToken(email, newPassword)
                setFname('')
                setEmail('')
                setLname('')
                setPostcode('')
                setAddress('')
                setProfile('')
                setError('')
                setRecordUpdate(true)
            })
                .catch(err => {
                    setError(err.response.data.error);
                })
        } else {
            setError('Unvalid Profile Picture')
        }
    }

    function covertToBase64(e) {
        setProfile('');
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

    function handleGender(e) {
        const { value, checked } = e.target;

        console.log(`value: ${value} checked: ${checked}`)

        if (checked) {
            setGender(value)
        }
    }

    return (
        <div className="page-wrapper">
            <div className="page-breadcrumb">
                <div className="container-fluid row">
                    <div className="col-12 d-flex no-block align-items-center">
                        <h4 className="page-title">Add Voter</h4>
                    </div>
                </div>

                <br />

                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <div className="card">
                            <form className="form-horizontal" method="post" onSubmit={handleSubmit}>
                                <div className="card-body">
                                    <h4 className="card-title">Voter Info</h4>
                                    <div className="form-group row">
                                        <label htmlFor="fname" className="col-sm-3 text-end control-label col-form-label">First Name</label>
                                        <div className="col-sm-9">
                                            <input type="text" value={fname} onChange={(e) => setFname(e.target.value)} className="form-control" id="fname" placeholder="First Name Here" required />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="lname" className="col-sm-3 text-end control-label col-form-label">Last Name</label>
                                        <div className="col-sm-9">
                                            <input type="text" value={lname} onChange={(e) => setLname(e.target.value)} className="form-control" id="lname" placeholder="Last Name Here" required />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="email" className="col-sm-3 text-end control-label col-form-label">Email</label>
                                        <div className="col-sm-9">
                                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="email" placeholder="Email Here" required />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label className="col-sm-3 text-end control-label col-form-label">Radio Buttons</label>
                                        <div className="col-md-9">
                                            <div className="form-check">
                                                <input type="radio" className="form-check-input" id="customControlValidation1" onChange={handleGender} value='Male' name="radio-stacked" required />
                                                <label className="form-check-label mb-0" htmlFor="customControlValidation1">Male</label>
                                            </div>
                                            <div className="form-check">
                                                <input type="radio" className="form-check-input" id="customControlValidation2" onChange={handleGender} value='Female' name="radio-stacked" required />
                                                <label className="form-check-label mb-0" htmlFor="customControlValidation2">Female</label>
                                            </div>
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

                                    <div className="form-group row">
                                        <label htmlFor="cono1" className="col-sm-3 text-end control-label col-form-label">Address</label>
                                        <div className="col-sm-9">
                                            <textarea value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" defaultValue={""} required />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="postcode" className="col-sm-3 text-end control-label col-form-label">Postcode</label>
                                        <div className="col-sm-9">
                                            <input value={postcode} onChange={(e) => setPostcode(e.target.value)} type="text" className="form-control" id="postcode" placeholder="Postcode Here" required />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <label className="col-sm-3"></label>
                                        <div className="col-md-9">
                                            <p className="m-0 error">{error}</p>
                                        </div>
                                    </div>
                                    {recordUpdate && (<div className="alert alert-success" role="alert">
                                        Record has been submited
                                    </div>)}

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

export default Addvoter;
