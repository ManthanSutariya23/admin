import { useState } from "react";


function Result() {

    let [isAction, setIsAction] = useState(false);

    return (
        <div className="page-wrapper">
            <div className="page-breadcrumb">
                <div className="row">
                    <div className="col-12 d-flex no-block align-items-center">
                        {isAction ? (<>
                            <span className="sidebar-link has-arrow waves-effect waves-dark" onClick={() => setIsAction(isAction = !isAction)}>
                                <i className="mdi mdi-keyboard-backspace" style={{ fontSize: '20px', fontWeight: 'bold' }}></i>
                            </span>&nbsp;&nbsp;
                        </>) : (<></>)}
                        <h4 className="page-title">Result</h4>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                {isAction ? (<>
                    <div className="container mt-5">
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-7">
                                <div className="card p-3 py-4">
                                    <div className="text-center">
                                        <img src="../assets/images/users/1.jpg" width={100} className="rounded-circle" />
                                    </div>
                                    <div className="text-center mt-3">
                                        <span className="bg-secondary p-1 px-4 rounded text-white">CEO</span>
                                        <h2 className="mt-2 mb-0">Alexender Schidmt</h2>
                                        <span>UI/UX Designer</span>
                                        <div className="px-4 mt-1">
                                            <p className="fonts">Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                                        </div>

                                        <button onClick={() => setIsAction(isAction = !isAction)} className="btn btn-outline-primary px-4">back</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>) : (<><div className="row">
                    {/* Column */}

                    {Array.from({ length: 6 }, (_, i) => (
                        <div className="col-md-6 col-lg-3 col-xlg-3">
                            <div className="card card-hover">
                                <div className="box text-white bg-cyan p-4 text-center justify-content-center align-items-center">
                                    <img src="../assets/images/users/1.jpg" alt="user" width="100" class="rounded-circle" />

                                    <h2 className="pt-3">Name</h2>

                                    <h2>Vote: 150</h2>

                                    <div className="align-self-center mt-5">
                                        <button type="button" class="btn btn-primary btn-lg text-white" onClick={() => setIsAction(isAction = !isAction)}>
                                            View
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))}

                </div></>)}
            </div>
        </div>
    );
}

export default Result;
