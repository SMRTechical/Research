
import moment from 'moment';

export const ALERTS = {
    baselineSaveSuccess : {
        heading:"Success",
        message:"Baseline saved successfully."
    },
    baselineSaveError : {
        heading:"Error",
        message:"Baseline could not be saved."
    },
    visitHeaderDuplicate : {
        heading:"Error",
        message : "Date of visit already exists."
    },
    visitHeaderInvalid : {
        heading:"Error",
        message : "A later date of visit already exists."
    },
    aecgcSaveSuccess : {
        heading:"Success",
        message:"American European CGC saved successfully."
    },
    aecgcSaveError : {
        heading:"Error",
        message:"American European CGC could not be saved."
    },
    diagnosisSaveSuccess : {
        heading:"Success",
        message:"Diagnosis saved successfully."
    },
    diagnosisSaveError : {
        heading:"Error",
        message:"Diagnosis could not be saved."
    },
    currentMedicationsSaveSuccess : {
        heading:"Success",
        message:"Current Medications saved successfully."
    },
    currentMedicationsSaveError : {
        heading:"Error",
        message:"Current Medications could not be saved."
    },


    immunomodularityTreatmentsSaveSuccess : {
        heading:"Success",
        message:"Other Immunomodularity Treatments saved successfully."
    },
    immunomodularityTreatmentsSaveError : {
        heading:"Error",
        message:"Other Immunomodularity Treatments could not be saved."
    },
    visitCompleteSaveSuccess : {
        heading:"Success",
        message:"Visit completed successfully."
    },
    visitCompleteSaveError : {
        heading:"Error",
        message:"Visit could not be completed."
    },
}

export const PATIENT = {
add : {
    pasId: "Hospital Number can't be empty.",
    pasIdLength: "Hospital Number 10 charaters max.",
    nhsNumber: "NHS Number is required.",
    nhsNumberLength : "NHS Number can only be 10 characters",
    dateOfBirth :"Date of birth is required.",
    firstNameLength:"First name can only be 20 characters.",
    lastNameLength:"Lastname can only be 20 characters.",
    postcodeLength:"Postcode can only be 10 characters."
},

search: {
searchCriteria: "Please specify search criteria."
}
}

export const AECGCValidationMessages = {
    ocularSignsObjective :{
        rightEyeRequired : "Right eye required",
        leftEyeRequired : "Left eye required",
        range: "Min: 0, Max 40",
        invalid: "Valid range is 0-40"
    },
    objectiveEvidence :{
            required: "Please select at least one of the following",
            mlRequired :"ml is required",
            minsRequired :"mins is required",
            mlRange: "Min: 0, Max 40",
            minsRange : "Min: 1, Max 20",
            mlDecimal : "2 numbers, optional 2 decimals",
            mlInvalid: "Valid range is 0-40",
            minsInvalid: "Valid range is 0-20"
    },
    histopathology :{
        yearRequired: "Year performed is required",
        validYear :"Min 1920, max: " + new Date().getFullYear()
    }

}

export const BASELINEMESSAGES = {
    invalidDate: "Invalid date",
    dateRequired: "Date required",
    futureDate: "Max date is " + moment().format("DD/MM/YYYY"),
    earlyDate: "Min date is " + moment().subtract(1,'year').format("DD/MM/YYYY"),
}


export const DiagnosisValidationMessages = {
    primarySjogrens : {
        alternateRequired: "Please specify an alternate diagnosis",
         alternateOtherRequired :"Please specify other alternate diagnosis"
    },
    sjogrensSymptoms :{
        monthRequired: "Please provide a month",
        yearRequired: "Please provide a year",
        monthRange : "Min: 1, Max 12",
        yearRange : "Min 1920, Max: " + new Date().getFullYear(),
    },
    sjogrensSymptomsSuggestive :{
        monthRequired: "Please provide a month",
        yearRequired: "Please provide a year",
        monthRange : "Min: 1, Max 12",
        yearRange : "Min 1920, Max: " + new Date().getFullYear(),
    },
    sjogrensDiagnosis :{
        monthRequired: "Please provide a month",
        yearRequired: "Please provide a year",
        monthRange : "Min: 1, Max 12",
        yearRange : "Min 1920, Max: " + new Date().getFullYear(),
    },
    sjogrensSymptomsSuggested :{
        monthRequired: "Please provide a month",
        yearRequired: "Please provide a year",
        monthRange : "Min: 1, Max 12",
        yearRange : "Min 1920, Max: " + new Date().getFullYear(),
    },
}


export const CurrentMedicationsValidationMessages = {
    symptomaticTreatments :{
        required : "Please select a treatment"
    }
}


export const DamageIndicesValidationMessages = {
    tearDuctSurgery :{
        alternateRequired : "One of the options below, must be selected."
    },
    otherEyeConditionsPleaseSpecify :{
        otherEyeConditionsRequired :"Please specify other eye condition"
    },
    renalTubularAcidosis : {
        required : "Requiring treatment? is required."
    },
    lymphomaPleaseSpecify :{
        lymphomaPleaseSpecifyRequired :"Please specify lymphoma other"
    },
    otherMalignancyPleaseSpecify :{
        otherMalignancyPleaseSpecifyRequired :"Please specify other malignancy"
    }
}


export const CODSValidationMessages = {
    numberOfTeethPresent :{
        range: "Min: 0, Max 99",
        invalid: "Valid range is 0-99"
    },
    numberOfTeethWithIncisionalCaries :{
        range: "Min: 0, Max 99",
        invalid: "Valid range is 0-99"
    },
    numberOfTeethWithCervicalOrRootCaries :{
        range: "Min: 0, Max 99",
        invalid: "Valid range is 0-99"
    },
}