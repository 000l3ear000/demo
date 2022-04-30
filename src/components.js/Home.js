import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'; // Optional theme CSS

// import {AgGridColumn, AgGridReact} from '@ag-grid-community/react';
// import {AllCommunityModules} from "@ag-grid-community/all-modules"
// import '@ag-grid-community/core/dist/styles/ag-grid.css';
// import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';

function Home() {
    const gridRef = useRef();
    const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row
    const [columnDefs, setColumnDefs] = useState([
        { field: 'name', filter: true, editable: true },
        { field: 'address_id', filter: true, editable: true },
        { field: 'city', editable: true, filter: true },
        { field: 'state', editable: true },
        { field: 'zipcode', editable: true },
        { field: 'owner', editable: true },
        { field: 'family', editable: true }

    ]);

    const defaultColDef = useMemo(() => ({
        sortable: true
    }));

    

    useEffect(() => {
        const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjUxMzU3MzA3LCJqdGkiOiIzNmNhODU2NjdmZjQ0OWFlODg0MDNjNTVhYTU5YTQ4MSIsInVzZXJfaWQiOjYxfQ.HbcNYNk3wPcDtxdw75LNVD589PSSQ2xdtShTwschPBs"
        fetch('https://equity-help-be.herokuapp.com/api/trust/trust/'
            , {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            }
        )
            .then(result => result.json())
            .then(rowData => {setRowData(rowData.results)})

    }, []);

    const updateValue=(e)=>{
        console.log(e)
    }

    // useEffect(() => {
    //     if (rowData) {
    //         gridRef.current.api.setServerSideDatasource(rowData);
    //     }
    // }, [rowData])

    // useEffect(() => {
    //     if(rowData){
    //         console.log(rowData)
    //         gridRef.current.api.setServerSideDatasource();
    //     }
    // },[rowData])
    
    // const onGridReady=()=>{
    //     gridRef.current.api.setServerSideDatasource(createDatasource);
    // }
    // var allData = []
    // // var idSequence
    // const onGridReady = useCallback((params) => {
    //     fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
    //       .then((resp) => resp.json())
    //       .then((data) => {
    //         allData = data.results;
    //         // add id to data
    //         // allData.forEach(function (item) {
    //         //   item.id = idSequence++;
    //         // });
    //         var dataSource = {
    //           getRows: function (params) {
    //             // To make the demo look real, wait for 500ms before returning
    //             setTimeout(function () {
    //               var response = getMockServerResponse(params.request);
    //               // call the success callback
    //               params.success({
    //                 rowData: response.rowsThisBlock,
    //                 rowCount: response.lastRow,
    //               });
    //             }, 500);
    //           },
    //         };
    //         params.api.setServerSideDatasource(dataSource);
    //       });
    //   }, []);
    
    const onGridReady=()=>{
        gridRef.current.api.setServerSideDatasource(createDatasource());
    }

    const cellClickedListener = useCallback(event => {
        const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjUxMzU3MzA3LCJqdGkiOiIzNmNhODU2NjdmZjQ0OWFlODg0MDNjNTVhYTU5YTQ4MSIsInVzZXJfaWQiOjYxfQ.HbcNYNk3wPcDtxdw75LNVD589PSSQ2xdtShTwschPBs"
        console.log('cellClicked', event.data);
        fetch('https://equity-help-be.herokuapp.com/api/trust/trust/' + event.data.id+"/"
            ,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(event.data)
            }
        )
        .then(result => result.json())
        .then(result => console.log(result))
        .catch(error => console.log(error))
        
    }, []);

    const buttonListener = useCallback(e => {
        gridRef.current.api.deselectAll();
    }, []);



    // const rowModelType = 'serverSide';

    const createDatasource = () => {
        console.log("called")
        return {
            // called by the grid when more rows are required
            getRows: async(params) => {
                // let data=""
                // get data for request from server
                const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjUxMzU3MzA3LCJqdGkiOiIzNmNhODU2NjdmZjQ0OWFlODg0MDNjNTVhYTU5YTQ4MSIsInVzZXJfaWQiOjYxfQ.HbcNYNk3wPcDtxdw75LNVD589PSSQ2xdtShTwschPBs"
                const data= await fetch('https://equity-help-be.herokuapp.com/api/trust/trust/'
                    , {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + token
                        }
                    }
                )

                const jsonData = await data.json();
                const final=jsonData.results;

                if (final) {
                    console.log(final)
                    // supply rows for requested block to grid
                    params.success({
                        rowData: final
                    });
                } else {
                    console.log("NIONO")
                    // inform grid request failed
                    params.fail();
                }
            }
        };
    }



    return (
        // <></>
        <div>

            {/* Example using Grid's API */}
            <button onClick={buttonListener}>Push Me</button>

            {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
            <div className="ag-theme-alpine" style={{ width: 1000, height: 500 }}>

                <AgGridReact
                    ref={gridRef} // Ref for accessing Grid's API
                    rowModelType="serverSide" // Server-side Pagination
                    onCellValueChanged={cellClickedListener} // Event Listener for Cell Clicked
                    columnDefs={columnDefs} // Column Defs for Columns
                    defaultColDef={defaultColDef} // Default Column Properties
                    onGridReady={onGridReady}
                    onCellValueChanged={cellClickedListener}
                    // onCellClicked={cellClickedListener} // Optional - registering for Grid Event
                />
            </div>
        </div>
    )
}

export default Home