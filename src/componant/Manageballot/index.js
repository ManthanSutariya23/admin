import { useEffect, useState } from "react";
import axios from 'axios';
import sendemail from '../Comman/sendemail'


function Manageballot(clientData) {

    let [isAction, setIsAction] = useState(false);
    let [isLoding, setIsLoding] = useState(true);
    let [ballot, setBallot] = useState('');
    let [ballotData, setBallotData] = useState('');
    let [candidate, setCandidate] = useState('');
    let [candidateId, setCandidateId] = useState('');
    let [ballotName, setBallotName] = useState('');
    let [isEditBallot, setIsEditBallot] = useState('');

    function getBallot() {
        setIsLoding(true);
        axios.post("http://localhost:8080/ballot/getballot", {
            "client_id": localStorage.getItem('token'),
        }).then((data) => {
            setBallot(data.data);
            // console.log(ballot);
            getCandidate()
        }).catch(err => console.log())
    }

    function getCandidate() {
        setIsLoding(true);
        axios.post("http://localhost:8080/candidate/getcandidate", {
            "client_id": localStorage.getItem('token'),
        }).then((data) => {
            setCandidate(data.data)
            // console.log("Candidate: " + candidate)
            setIsLoding(false)
        }).catch(err => console.log())
    }

    useEffect(() => {
        getBallot()
    }, [])

    return (
        <div className="page-wrapper">
            <div className="page-breadcrumb">
                <div className="container-fluid row">
                    <div className="col-12 d-flex no-block align-items-center">
                        {isAction ? (<>
                            <span className="sidebar-link has-arrow waves-effect waves-dark" onClick={() => setIsAction(isAction = !isAction)}>
                                <i className="mdi mdi-keyboard-backspace" style={{ fontSize: '20px', fontWeight: 'bold' }}></i>
                            </span>&nbsp;&nbsp;
                        </>) : (<></>)}
                        <h4 className="page-title">Manage Ballot</h4>
                    </div>
                </div>
                <br />
                <div className="container-fluid">
                    <div class="row">


                        {isLoding ? <h5 className="text-center">Loading...</h5> : isAction ? (<>
                            <div className="container mt-5">
                                <div className="row d-flex justify-content-center">
                                    <div className="col-md-7">
                                        <div className="card p-3 py-4">
                                            {candidate.map((item) => {
                                                if (item._id === candidateId) {
                                                    return <CandidateDetail item={item} ballotName={ballotName}>
                                                        <button onClick={() => setIsAction(isAction = !isAction)} className="btn btn-outline-primary px-4">back</button>
                                                    </CandidateDetail>
                                                } else {
                                                    return <></>
                                                }
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>) : isEditBallot ? (<>

                            <EditBallot ballotData={ballotData} setIsEditBallot={setIsEditBallot} isEditBallot={isEditBallot} getBallot={getBallot}>
                                <span style={{ marginLeft: '20px' }}>
                                    <button onClick={() => { setIsEditBallot(false); getBallot(); }} className="btn btn-outline-primary px-4">back</button>
                                </span>
                            </EditBallot>

                        </>) : (<>
                            {ballot.map((item) => {
                                return <Ballot
                                    item={item}
                                    setIsEditBallot={setIsEditBallot}
                                    isEditBallot={isEditBallot}
                                    setBallotData={setBallotData}
                                    candidate={candidate}
                                    setCandidateId={setCandidateId}
                                    setIsAction={setIsAction}
                                    setBallotName={setBallotName}
                                    isAction={isAction}
                                    clientData={clientData.clientData}
                                    getBallot={getBallot}
                                />
                            })}
                        </>)}

                    </div>
                </div>
            </div>
        </div>
    );
}

function Ballot({ item, setIsEditBallot, isEditBallot, setBallotData, candidate, setCandidateId, setIsAction, isAction, setBallotName, clientData, getBallot }) {
    let [email, setEmail] = useState('');
    let [isError, setIsError] = useState(false);
    let [isSendEmail, setIsSendEmail] = useState(false);
    let tmp = 0

    function handleSendRegisterLink(e) {
        e.preventDefault();
        for (let i = 0; i < candidate.length; i++) {
            if (candidate[i].ballot_id === item._id) {
                console.log(candidate[i].email)
                if (candidate[i].email === email) {
                    // console.log(email)
                    setIsSendEmail(false)
                    setIsError(true)
                    tmp = 1;
                }
            }
        }

        if (tmp === 0) {
            createCandidate()
        }
    }

    function createCandidate() {
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let password = '';
        for (let i = 0; i < 18; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        axios.post("http://localhost:8080/candidate", {
            client_id: localStorage.getItem('token'),
            ballot_id: item._id,
            email: email,
            password: password,
            fname: "",
            lname: "",
            status: true,
            photo: "",
            description: ""
        }).then((data) => {
            sendEmail(password)
        }).catch(err => console.log(err))
    }

    function handleUpdateStatus(idd, status) {
        axios.put("http://localhost:8080/candidate/status", {
            id: idd,
            status: status
        }).then((data) => {
            console.log(data.data);
            getBallot();
        })
            .catch(err => {
                console.log(err.response.data.error);
            })
    }


    function sendEmail(password) {
        const message = ''
        const receiverEmail = email
        const subject = 'Register your self as a Candidate'
        const html = `Hello, candidate 🖐<br/> ${clientData.client_name} send email from E-Vote Hub <br/><br/> Your login credential of candidate is below <br/> Email: ${email} <br/> Password: ${password} <br/><br/> <a href="http://localhost:3001/login">Click here</a> login and add your more information as candidate of ${item.ballot_name}`
        sendemail(message, receiverEmail, subject, html)
        getBallot()
        setIsSendEmail(true)
        setIsError(false)
    }

    return <div class="col-12">
        <div className="card">
            <div className="card-body">
                <div className="d-flex justify-content-between flex-row">
                    <h4 className="card-title mb-0">{item.ballot_name}</h4>
                    <div>
                        <button type="button" class="btn btn-primary btn-sm text-white" onClick={() => { setIsEditBallot(isEditBallot = !isEditBallot); setBallotData(item) }}>
                            Edit
                        </button>
                    </div>
                </div>

            </div>
            <div className="comment-widgets scrollable ps-container ps-theme-default border-top mb-0" data-ps-id="d41e73ef-9f47-7f71-f902-5df5ba122492">

                {candidate.map((candid) => {
                    if (item._id === candid.ballot_id) {
                        return <Candidate candid={candid}>
                            <div className="d-flex pt-1">
                                <button type="button" class="btn btn-secondary btn-sm text-white" onClick={() => { setCandidateId(candid._id); setIsAction(isAction = !isAction); setBallotName(item.ballot_name) }}>
                                    View
                                </button>
                                &nbsp;&nbsp;
                                {candid.status
                                    ? (<button type="button" onClick={() => handleUpdateStatus(candid._id, false)} className="btn btn-danger margin-5 flex-grow-1">Denied</button>)
                                    : (<button type="button" onClick={() => handleUpdateStatus(candid._id, true)} className="btn btn-success text-white flex-grow-1">Approved</button>)}
                            </div>
                        </Candidate>
                    } else {
                        return <></>
                    }
                })}
            </div>
            <div className="card-body">
                <form className="form-horizontal" method='post' onSubmit={handleSendRegisterLink}>
                    <div className="d-flex">
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="fname" placeholder="Enter Email of Candidate for Sending Registration Link" required />
                        <button type="submit" class="btn btn-primary btn-sm text-white" style={{ marginLeft: '20px' }}>
                            Send
                        </button>
                    </div>
                </form>
                {isSendEmail ? (<div className="alert alert-success mt-3" role="alert">
                    Email has been sent
                </div>) : (<></>)}

                {isError ? (<div className="alert alert-danger mt-3" role="alert">
                    Email already exist in this ballot
                </div>) : (<></>)}
            </div>
        </div>
    </div>
}

function EditBallot({ ballotData, children, setIsEditBallot, getBallot }) {
    const [ballotName, setBallotName] = useState(ballotData.ballot_name);
    const [maxVote, setMaxVote] = useState(ballotData.max_vote);
    const [minVote, setMinVote] = useState(ballotData.min_vote);
    const [errMsg, setErrMsg] = useState();

    function updateBallot(e) {
        e.preventDefault();
        if (minVote < maxVote) {
            axios.put("http://localhost:8080/ballot", {
                "id": ballotData._id,
                "ballot_name": ballotName,
                "max_vote": maxVote,
                "min_vote": minVote
            }).then((data) => {
                getBallot();
                setIsEditBallot(false)
            })
                .catch(err => console.log())
        } else {
            setErrMsg('Minimum Vote is less than Maximum Vote');
        }
    }

    return <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
            <div className="card">
                <form className="form-horizontal" onSubmit={updateBallot}>
                    <div className="card-body">
                        <h4 className="card-title">Ballot Info</h4>
                        <div className="form-group row">
                            <label htmlFor="fname" className="col-sm-3 text-end control-label col-form-label">Ballot Name</label>
                            <div className="col-sm-9">
                                <input type="text" value={ballotName} onChange={(e) => setBallotName(e.target.value)} className="form-control" id="fname" placeholder="Ballot Name" required />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="fname" className="col-sm-3 text-end control-label col-form-label">Minimum Vote</label>
                            <div className="col-sm-9">
                                <input type="number" min={1} value={minVote} onChange={(e) => setMinVote(e.target.value)} className="form-control" id="fname" placeholder="1" />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="fname" className="col-sm-3 text-end control-label col-form-label">Maximum Vote</label>
                            <div className="col-sm-9">
                                <input type="number" min={1} value={maxVote} onChange={(e) => setMaxVote(e.target.value)} className="form-control" id="fname" placeholder="0" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-3"></div>
                            <div className="col-sm-9">
                                <p style={{ color: 'red' }}>{errMsg}</p>
                            </div>
                        </div>

                    </div>
                    <div className="border-top">
                        <div className="card-body">
                            <div className="btn-list">
                                <button type="submit" className="btn btn-primary">
                                    Submit
                                </button>

                                {children}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
}

function CandidateDetail({ item, ballotName, children }) {
    return <>
        <div className="text-center">
            <img src={item.photo} alt="profile" width={100} className="rounded-circle" />
        </div>
        <div className="text-center mt-3">
            <span className="bg-secondary p-1 px-4 rounded text-white">{ballotName}</span>
            <h2 className="mt-2 mb-0">{item.fname} {item.lname}</h2>
            <span>{item.email}</span>
            <div className="px-4 mt-1">
                <p className="fonts">{item.description}</p>
            </div>

            {children}
        </div>
    </>
}

function Candidate({ candid, children }) {
    return <div className="d-flex flex-row comment-row mt-0 border-bottom">
        <div className="p-2">
            <img src={candid.photo ? candid.photo : 'temp_profile.png'} alt="user" width={50} className="rounded-circle" />
        </div>
        <div className="comment-text w-100">
            <h6 className="font-medium">{candid.fname || candid.lname ? candid.fname + " " + candid.lname : candid.email}</h6>
            <span className="mb-3 d-block">
                {candid.description ? candid.description : 'No Description'}
            </span>
        </div>
        <div className="align-self-center">
            {children}
        </div>
    </div>
}

export default Manageballot;
