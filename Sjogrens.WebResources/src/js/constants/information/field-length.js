
export const PATIENTFIELDS = {
    maxLength :{
        pasId: 10,
        nhsNumber : 10,
        firstName: 20,
        lastName: 20,
        postcode: 10
    }
}

export const AECGCFields = {
    ocularSignsObjectiveEyeMin: 0,
    ocularSignsObjectiveEyeMax: 40,
    ocularSignsObjectiveANegativeMin:6,
    objectiveEvidenceMlMin:0,
    objectiveEvidenceMlMax:40,
    objectiveEvidenceMinsMin:1,
    objectiveEvidenceMinsMax:20,
    histopathologyYearPerformedMin:1920,
    histopathologyYearPerformedMax:new Date().getFullYear()
    }

    
export const DiagnosisFields = {
   sjogrensSymptomsMonthMin: 1,
   sjogrensSymptomsMonthMax: 12,
   sjogrensSymptomsYearMin:1920,   
   sjogrensSymptomsYearMax: new Date().getFullYear(),
   sjogrensSymptomsSuggestiveMonthMin: 1,
   sjogrensSymptomsSuggestiveMonthMax: 12,
   sjogrensSymptomsSuggestiveYearMin:1920,   
   sjogrensSymptomsSuggestiveYearMax: new Date().getFullYear(),
   sjogrensSymptomsSuggestedMonthMin: 1,
   sjogrensSymptomsSuggestedMonthMax: 12,
   sjogrensSymptomsSuggestedYearMin:1920,   
   sjogrensSymptomsSuggestedYearMax: new Date().getFullYear(),
   sjogrensDiagnosisMonthMin: 1,
   sjogrensDiagnosisMonthMax: 12,
   sjogrensDiagnosisYearMin:1920,
   sjogrensDiagnosisYearMax: new Date().getFullYear()
    }

    export const ConstitutionalDomain = {
        weighting:3,
        WeightingValues: [0,1,2]
    }

    
export const DamageIndicesFieldLength = {
    ocularTearFilmBreakUpTimeMin: 1,
    ocularTearFilmBreakUpTimeMax: 999
    }


    export const SalivaryFlowFieldLength = {
        unstimulatedSalivaryFlowMin: 0,
        unstimulatedSalivaryFlowMax: 99,
        stimulatedSalivaryFlowMin: 0,
        stimulatedSalivaryFlowMax: 99
        }


        
    export const CODSFieldLength = {
        numberOfTeethPresentMin: 0,
        numberOfTeethPresentMax: 99,
        numberOfTeethWithIncisionalCariesMin: 0,
        numberOfTeethWithIncisionalCariesMax: 99,
        numberOfTeethWithWithCervicalOrRootCariesMin: 0,
        numberOfTeethWithWithCervicalOrRootCariesMax: 99
        }




        export const FatFreeMassFieldLength = {
            fatFreeMassMin: 0,
            fatFreeMassMax: 999.9,
            fatMassMin: 0,
            fatMassMax: 99
            }