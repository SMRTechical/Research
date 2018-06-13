import React from 'react';
import { NavLink } from 'react-router-dom'
import {handleDateFormat } from '../../factory/date-functions'

export default function PatientFoundCard({patient, getPatient}){
    return(
        <tr onClick={()=>getPatient(patient.token)}>
            <td  data-th="Hospital Number">{patient.pasId}</td>
            <td data-th="NHS Number">{patient.nhsNumber}</td>
            <td data-th="First Name">{patient.firstName}</td>
            <td data-th="Last Name">{patient.lastName}</td>
            <td data-th="Date of Birth">{handleDateFormat(patient.dateOfBirth)}</td>
            <td data-th="Postcode">{patient.postCode}</td>
            <td data-th="Organisation Code">{patient.organisationCode}</td>
        </tr>
    );
}