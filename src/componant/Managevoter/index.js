import { useEffect, useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import axios from 'axios';


function Managevoter() {

    const [voterData, setVoterData] = useState([]);
    const [loading, setLoading] = useState();
    let [isEdit, setIsEdit] = useState(false);
    // const createUsers = (numUsers = voterData.length) => new Array(numUsers).fill(undefined).map(voterData);
    // const voters = createUsers(voterData.length);

    const columns = [
        {
            name: 'First Name',
            selector: row => row.fname,
            sortable: true,
        },
        {
            name: 'Last Name',
            selector: row => row.lname,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Address',
            selector: row => row.address,
            sortable: true,
        },
        {
            name: 'Postcode',
            selector: row => row.postcode,
            sortable: true,
        },
    ];

    useEffect(() => {
        fetchTableData();
    }, []);

    async function fetchTableData() {
        setLoading(true);
        axios.post("http://localhost:8080/voter/getvoter", {
            client_id: localStorage.getItem('token'),
        }).then((data) => {
            setVoterData(data.data)
            console.log(data.data);
            setLoading(false);

        })
            .catch(err => {
                console.log(err)
                // setError(err.response.data.error);
            })
    }

    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const filteredItems = voterData.filter(item => (item.fname && item.fname.toLowerCase().includes(filterText.toLowerCase())) || (item.address && item.address.toLowerCase().includes(filterText.toLowerCase())));
    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };
        // return <FilterComponent onFilter={(e) => setFilterText(e.target.value)} onClear={() => handleClear()} filterText={filterText} />;
        return <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-8">
                        <h2 className="text-start p-4 m-0">Voters</h2>
                    </div>
                    <div className="col-4 d-flex p-4">
                        <input type="text" data-toggle="tooltip" title="" value={filterText}
                            onChange={(e) => setFilterText(e.target.value)} class="form-control" id="search" placeholder="Filter By First Name and Last Name" required="" data-bs-original-title="A Tooltip for the input !" aria-label="Search Input" aria-describedby="tooltip912165" />
                        &nbsp;&nbsp;
                        <button type="button" className="btn btn-primary" onClick={() => handleClear()}>
                            Clear
                        </button>
                    </div>
                </div>
            </div>
        </>
    }, [filterText, resetPaginationToggle]);

    let [fname, setFname] = useState('');
    let [email, setEmail] = useState('');
    let [lname, setLname] = useState('');
    let [postcode, setPostcode] = useState('');
    let [gender, setGender] = useState('');
    let [address, setAddress] = useState('');
    let [error, setError] = useState('');
    let [id, setId] = useState();

    function handleSubmit(e) {
        e.preventDefault();
        axios.put("http://localhost:8080/voter", {
            id: id,
            fname: fname,
            lname: lname,
            address: address,
            postcode: postcode,
            gender: gender,
        }).then((data) => {
            setFname('')
            setEmail('')
            setLname('')
            setPostcode('')
            setAddress('')
            setError('')
            fetchTableData()
            setIsEdit(false)
            console.log(data.data);
        })
            .catch(err => {
                setError(err.response.data.error);
            })
    }

    function handleGender(e) {
        const { value, checked } = e.target;

        console.log(`value: ${value} checked: ${checked}`)

        if (checked) {
            setGender(value)
        }
    }

    function handleUpdateStatus(idd, status) {
        axios.put("http://localhost:8080/voter/updatestatus", {
            id: idd,
            approved: status === 1 ? 0 : 1
        }).then((data) => {
            console.log(data.data);
            fetchTableData();
        })
            .catch(err => {
                console.log(err.response.data.error);
            })
    }

    const tableStyle = {
        header: {
            style: {
                minHeight: '56px',
                textAlign: 'center'
            },
        },
        headRow: {
            style: {
                borderTopStyle: 'solid',
                borderTopWidth: '1px',
                borderTopColor: 'lightgrey',
                fontSize: '17px',
                textAlign: 'center'
            },
        },
        headCells: {
            style: {
                '&:not(:last-of-type)': {
                    borderRightStyle: 'solid',
                    borderRightWidth: '1px',
                    borderRightColor: 'lightgrey',
                    fontSize: '17px',
                    textAlign: 'center'
                },
            },
        },
        cells: {
            style: {
                '&:not(:first-of-type)': {
                    borderRightStyle: 'solid',
                    borderRightWidth: '1px',
                    borderRightColor: 'lightgrey',
                    fontSize: '17px',
                    textAlign: 'center'
                },
            },
        },
    };

    return (

        <div className="page-wrapper">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">

                        {isEdit ? (<>
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
                                                    <label className="col-sm-3 text-end control-label col-form-label">Radio Buttons</label>
                                                    <div className="col-md-9">
                                                        <div className="form-check">
                                                            {gender === 'Male' ? (<input type="radio" className="form-check-input" id="customControlValidation1" onChange={handleGender} value='Male' name="radio-stacked" required checked />) : (<input type="radio" className="form-check-input" id="customControlValidation1" onChange={handleGender} value='Male' name="radio-stacked" required />)}
                                                            <label className="form-check-label mb-0" htmlFor="customControlValidation1">Male</label>
                                                        </div>
                                                        <div className="form-check">
                                                            {gender === 'Female' ? (<input type="radio" className="form-check-input" id="customControlValidation2" onChange={handleGender} value='Female' name="radio-stacked" required checked />) : (<input type="radio" className="form-check-input" id="customControlValidation2" onChange={handleGender} value='Female' name="radio-stacked" required />)}
                                                            <label className="form-check-label mb-0" htmlFor="customControlValidation2">Female</label>
                                                        </div>
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

                                            </div>
                                            <div className="border-top">
                                                <div className="card-body">
                                                    <button type="submit" className="btn btn-primary">
                                                        Update
                                                    </button>&nbsp;&nbsp;&nbsp;
                                                    <button type="button" onClick={() => { setIsEdit(isEdit = !isEdit) }} className="btn btn-outline-primary">
                                                        Back
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </>) : (<><div className="card">
                            <DataTable
                                //title="Data"
                                columns={columns}
                                data={filteredItems}
                                style={{ fontSize: "30px" }}
                                progressPending={loading}
                                highlightOnHover
                                pointerOnHover
                                pagination
                                paginationResetDefaultPage={resetPaginationToggle}
                                // fixedHeader={true}
                                // fixedHeaderScrollHeight={'74vh'}
                                subHeaderComponent={subHeaderComponentMemo}
                                subHeader
                                customStyles={tableStyle}
                                expandableRows={true}
                                expandableRowsComponent={(data) =>
                                    <VoterDisplay
                                        data={data.data}
                                        onEdit={() => {
                                            setIsEdit(isEdit = !isEdit);
                                            setFname(data.data.fname);
                                            setLname(data.data.lname);
                                            setGender(data.data.gender);
                                            setAddress(data.data.address);
                                            setPostcode(data.data.postcode);
                                            setId(data.data._id);
                                        }}
                                        onStatus={() => { handleUpdateStatus(data.data._id, data.data.approved) }} />
                                }
                            />
                        </div></>)}
                    </div>
                </div>
            </div>
        </div>
    );
}

function VoterDisplay({ data, onEdit, onStatus }) {
    return <div className="container-fluid py-5 h-100" style={{ backgroundColor: '#9de2ff' }}>
        <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-md-9 col-lg-7 col-xl-4">
                <div className="card" style={{ borderRadius: '15px' }}>
                    <div className="card-body p-4">
                        <div className="d-flex text-black">
                            <div className="flex-shrink-0">
                                <img src={data.photo} alt="Profile" className="img-fluid" style={{ width: '180px', height: '180px', borderRadius: '10px' }} />
                            </div>
                            <div className="flex-grow-1 ms-3">
                                <h5 className="mb-1">{data.fname} {data.lname}</h5>
                                <p className="mb-2 pb-1" style={{ color: '#2b2a2a', borderRadius: '10px' }}>{data.email}</p>
                                <div className="p-2 mb-2" style={{ backgroundColor: '#efefef' }}>
                                    <p className="mb-2">Address: {data.address}, {data.postcode}</p>
                                    <p className="m-0">Gender: {data.gender}</p>
                                </div>
                                <div className="d-flex pt-1">
                                    <button type="button" onClick={onEdit} className="btn btn-outline-primary me-1 flex-grow-1">Edit</button>
                                    {data.approved === 1
                                        ? (<button type="button" onClick={onStatus} className="btn btn-danger margin-5 flex-grow-1">Denied</button>)
                                        : (<button type="button" onClick={onStatus} className="btn btn-success text-white flex-grow-1">Approved</button>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>;
}

export default Managevoter;
