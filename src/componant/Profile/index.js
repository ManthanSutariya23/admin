import { useEffect, useState } from 'react';
import axios from 'axios';

function Profile({ data, fetchData }) {

    let [cName, setCName] = useState(data.client_name);
    let [email, setEmail] = useState(data.email);
    let [profile, setProfile] = useState(data.logo);
    let [address, setAddress] = useState(data.address);
    let [error, setError] = useState();
    let [recordUpdate, setRecordUpdate] = useState(false);

    function handleUpdateTitle(e) {
        e.preventDefault();
        axios.put("http://localhost:8080/client/profile", {
            id: data._id,
            email: email,
            logo: profile,
            address: address,
            client_name: cName
        }).then((data) => {
            fetchData();
            setRecordUpdate(true)
            console.log(data.data);
        })
            .catch(err => {
                console.log(err.response.data.error);
            })
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

    return (
        <div className="page-wrapper">
            <div className="page-breadcrumb">
                <div className="container-fluid row">
                    <div className="col-12 d-flex no-block align-items-center">
                        <h4 className="page-title">Manage Profile</h4>
                    </div>
                </div>

                <div className="container-fkuid">
                    <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-6">
                            <div className="card">
                                <form className="form-horizontal" method='post' onSubmit={handleUpdateTitle}>
                                    <div className="card-body">
                                        <h4 className="card-title">Personal Info</h4>
                                        <div className="form-group row">
                                            <label htmlFor="fname" className="col-sm-3 text-end control-label col-form-label">Company</label>
                                            <div className="col-sm-9">
                                                <input type="text" value={cName} onChange={(e) => setCName(e.target.value)} className="form-control" id="fname" placeholder="Company Name Here" />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="email" className="col-sm-3 text-end control-label col-form-label">Email</label>
                                            <div className="col-sm-9">
                                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="email" placeholder="Last Name Here" />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-sm-3 text-end control-label col-form-label">Profile</label>
                                            <div className="col-md-9">
                                                <div className="custom-file">
                                                    <input type="file" accept="image/*" onChange={covertToBase64} className="custom-file-input" id="validatedCustomFile" />
                                                    <div className="invalid-feedback">
                                                        Example invalid custom file feedback
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {profile
                                            ? (<div className="row">
                                                <label className="col-sm-3 text-end">{('Preview: ')}</label>
                                                <div className="col-md-9">
                                                    {<img src={profile} alt="Profile" width={100} height={100} />}&nbsp;&nbsp;&nbsp;
                                                    <span onClick={() => setProfile('')} className='error' style={{ cursor: 'pointer' }}>Remove Profile</span>
                                                </div>
                                            </div>)
                                            : <></>}

                                        <div className="form-group row">
                                            <label htmlFor="cono1" className="col-sm-3 text-end control-label col-form-label">Address</label>
                                            <div className="col-sm-9">
                                                <textarea value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" style={{ height: '42px' }} defaultValue={""} />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <label className="col-sm-3"></label>
                                            <div className="col-md-9">
                                                <p className="m-0 error">{error}</p>
                                            </div>
                                        </div>
                                        {recordUpdate && (<div className="alert alert-success" role="alert">
                                            Record has been updated
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
        </div>
    );
}

export default Profile;
