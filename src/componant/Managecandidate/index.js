import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

function Managecandidate() {
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [perPage, setPerPage] = useState(10);
    const columns = [
        {
            name: "In Market Date",
            selector: (row) => row.userId,
            width: "120px",
            wrap: true,
            sortable: true,
        },
        {
            name: "Topic/Title",
            selector: (row) => row.title,
            wrap: true,
            sortable: true,
        },
        {
            name: "Sl Number",
            selector: (row) => row.title,
            wrap: true,
            sortable: true,
        },
        {
            name: "Document ID",
            selector: (row) => row.title,
            wrap: true,
            sortable: true,
        },
        {
            name: "Meeting Contact",
            selector: (row) => row.title,
            wrap: true,
            sortable: true,
        },
        {
            name: "Reference",
            selector: (row) => (row.completed ? "Yes" : "No"),
            wrap: true,
            sortable: true,
        }
    ];

    useEffect(() => {
        fetchTableData();
    }, []);

    async function fetchTableData() {
        setLoading(true);

        const response = await fetch("https://jsonplaceholder.typicode.com/todos");

        const users = await response.json();
        setData(users);
        setLoading(false);
    }
    return (

        <div className="page-wrapper">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <DataTable
                                //title="Data"
                                columns={columns}
                                data={data}
                                style={{ fontSize: "30px" }}
                                progressPending={loading}
                                highlightOnHover
                                pointerOnHover
                                pagination
                                selectableRows
                                customStyles={{
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
                                            fontSize: '20px',
                                            textAlign: 'center'
                                        },
                                    },
                                    headCells: {
                                        style: {
                                            '&:not(:last-of-type)': {
                                                borderRightStyle: 'solid',
                                                borderRightWidth: '1px',
                                                borderRightColor: 'lightgrey',
                                                fontSize: '20px',
                                                textAlign: 'center'
                                            },
                                        },
                                    },
                                    cells: {
                                        style: {
                                            '&:not(:last-of-type)': {
                                                borderRightStyle: 'solid',
                                                borderRightWidth: '1px',
                                                borderRightColor: 'lightgrey',
                                                fontSize: '20px',
                                                textAlign: 'center'
                                            },
                                        },
                                    },
                                }}
                                expandableRows={true}
                                expandableRowsComponent={(data) =>
                                    <p className="p-3">
                                        <pre>{data['data']['userId']}</pre>
                                        <pre>{JSON.stringify(data)}</pre>
                                    </p>
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Managecandidate;
