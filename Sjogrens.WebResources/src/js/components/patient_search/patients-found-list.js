import React from 'react';
import PatientFoundCard from './patient-found-card';
import PanelDefault from '../generic/panel-default';

export default function PatientsFoundList({patientSearchHeaders, patients, getPatient}) {
    const emptyMessage = (
        <p>There are no patients matching the search criteria specified.</p>
    );

    const patientsList = (
        <div>
            {/* <div className="alert alert-info">
                <div className="container-fluid">
                    <div className="row">
                    <div className="col-md-1 text-center">
                    <i className="fa fa-info-circle fa-8" aria-hidden="true"></i>
                    </div>
                    </div>
                </div>
            </div> */}
            <div className="table-responsive">
                <table className="table table-hover table-bordered table-vertical">
                    <thead>
                        <tr className="table-header">
                            {
                                patientSearchHeaders.map((header, i)=>{return <th key={i + '_' + header.headerText}>{header.headerText}</th>})
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {patients.data.map(patient=><PatientFoundCard patient={patient} key={patient.pid + '_' + patient.pasId} getPatient={getPatient}/>)}
                    </tbody>
                </table>
            </div>
        </div>
    )


    
    return (

<div>


 { 
<PanelDefault title={"Patient Search Results"}>
    {  patients.data.length == 0 ? emptyMessage: patientsList}
</PanelDefault> 

} 
</div>



    );
}

// GamesList.propTypes = {
//     games:React.propTypes.array
// }