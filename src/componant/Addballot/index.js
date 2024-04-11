import { useState } from "react";
import axios from 'axios';


function Addballot() {

    const [ballotName, setBallotName] = useState();
    const [maxVote, setMaxVote] = useState(1);
    const [minVote, setMinVote] = useState(1);
    const [errMsg, setErrMsg] = useState();

    function createBallot(e) {
        e.preventDefault();
        if (minVote < maxVote) {
            axios.post("http://localhost:8080/ballot", {
                "client_id": localStorage.getItem('token'),
                "ballot_name": ballotName,
                "max_vote": maxVote,
                "min_vote": minVote
            }).then((data) => {
                clear();
            })
                .catch(err => console.log())
        } else {
            setErrMsg('Minimum Vote is less than Maximum Vote');
        }
    }

    function clear() {
        setBallotName('');
        setErrMsg('')
        setMinVote(1);
        setMaxVote(1);
    }

    return (

        <div className="page-wrapper">
            <div className="page-breadcrumb">
                <div className="container-fluid row">
                    <div className="col-12 d-flex no-block align-items-center">
                        <h4 className="page-title">Add Ballot</h4>
                    </div>
                </div>

                <br />

                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <div className="card">
                            <form className="form-horizontal" onSubmit={createBallot}>
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

export default Addballot;
