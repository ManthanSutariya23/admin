import { useEffect, useState } from "react";
import axios from 'axios';

function Dashboard({ data }) {

    let [isLoding, setIsLoding] = useState(true);
    let [totalVoter, setTotalVoter] = useState();
    let [totalCandidate, setTotalCandidate] = useState();
    let [totalBallot, setTotalBallot] = useState();

    useEffect(() => {
        getVoter();
    }, []);

    async function getVoter() {
        setIsLoding(true);
        axios.post("http://localhost:8080/admin/alldata", {
            token: localStorage.getItem('token'),
        }).then((data) => {
            setTotalVoter(data.data.length)
            setIsLoding(false)
            console.log(data.data);
        })
            .catch(err => {
                console.log(err)
                // setError(err.response.data.error);
            })
    }



    return (
        <div className="page-wrapper">
            <div className="page-breadcrumb">
                <div className="row">
                    <div className="col-12 d-flex no-block align-items-center">
                        <h4 className="page-title">Dashboard</h4>
                    </div>
                </div>
            </div>
            {isLoding ? (<h4 className="text-center pb-3">Loading...</h4>) : (<div className="container-fluid">
                <div className="row">
                    <div className="col-md-6 col-lg-3 col-xlg-3">
                        <div className="card card-hover">
                            <div className="box bg-cyan p-4 text-center d-flex justify-content-center align-items-center">
                                <h1 className="font-light text-white">
                                    <i className="mdi mdi-account-card-details" />
                                </h1>
                                <h3 className="text-white">&nbsp; {totalBallot} Total Ballot</h3>
                            </div >
                        </div >
                    </div >

                    <div className="col-md-6 col-lg-3 col-xlg-3">
                        <div className="card card-hover">
                            <div className="box bg-cyan p-4 text-center d-flex justify-content-center align-items-center">
                                <h1 className="font-light text-white">
                                    <i className="mdi mdi-account-multiple" />
                                </h1>
                                <h3 className="text-white">&nbsp; {totalVoter} Total Voter</h3>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-lg-3 col-xlg-3">
                        <div className="card card-hover">
                            <div className="box bg-cyan p-4 text-center d-flex justify-content-center align-items-center">
                                <h1 className="font-light text-white">
                                    <i className="mdi mdi-contacts" />
                                </h1>
                                <h3 className="text-white">&nbsp; {totalCandidate} Total Candiate</h3>
                            </div>
                        </div>
                    </div>

                </div >
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <h3 class="card-title">URL</h3>
                                <div className="border-top pt-3">
                                    <h4>Election URL</h4>
                                </div>
                                <div class="bg-light p-2" style={{ fontSize: '20px' }}>
                                    https://getbootstrap.com/docs/4.2/utilities/flex/
                                </div>

                                <div className="pt-3">
                                    <h4>Preview URL</h4>
                                </div>
                                <div class="bg-light p-2" style={{ fontSize: '20px' }}>
                                    https://getbootstrap.com/docs/4.2/utilities/flex/
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <h3 class="card-title">Election Day</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div >)
            }
        </div >
    );
}

export default Dashboard;
