export const salivaryGlandBiospy = {
  
    optSalivaryGlandBiospy : [
     {
       categoryId:10,
        controlId:1,
        controlValueId:11,
        controlValue:'Yes'
    }, 
    {
       categoryId:10,
        controlId:1,
        controlValueId:12,
        controlValue:'No'

    },
]
}

export const pulmonaryFunctionTests = {
    
      optPulmonaryFunctionTests : [
       {
         categoryId:10,
          controlId:2,
          controlValueId:21,
          controlValue:'Yes'
      }, 
      {
         categoryId:10,
          controlId:2,
          controlValueId:22,
          controlValue:'No'
  
      },
  ]
  }
  
export const salivaryGlandUltrasound = {
    
      optSalivaryGlandUltrasound : [
       {
         categoryId:10,
          controlId:3,
          controlValueId:31,
          controlValue:'Yes'
      }, 
      {
         categoryId:10,
          controlId:3,
          controlValueId:32,
          controlValue:'No'
  
      },
  ]
  }
  
  
export const imagingDepartment = {
    
      optImagingDepartment : [
       {
         categoryId:10,
          controlId:4,
          controlValueId:41,
          controlValue:'Yes'
      }, 
      {
         categoryId:10,
          controlId:4,
          controlValueId:42,
          controlValue:'No'
  
      },
  ]
  }



  export const irfCohort = {
    
      optIRFCohort : [
       {
         categoryId:10,
          controlId:5,
          controlValueId:51,
          controlValue:'Yes'
      }, 
      {
         categoryId:10,
          controlId:5,
          controlValueId:52,
          controlValue:'No'
      },
  ]
  }


// export const patientHasPhysiciansDiagnosis = {
    
//       optPatientHasPhysiciansDiagnosis : [
//        {
//          categoryId:4,
//           controlId:1,
//           controlValueId:41,
//           controlValue:'Yes'
//       }, 
//       {
//          categoryId:4,
//           controlId:1,
//           controlValueId:42,
//           controlValue:'No'
  
//       },
//       {
//           categoryId:4,
//            controlId:1,
//            controlValueId:43,
//            controlValue:'No, but considered at risk'
   
//        }],
//   }

  export const patientMeetsAECGCriteria = {
    chkPatientMeetsAECGCriteria :{
        categoryId:4,
        controlId:2
      },
  }


  export const patientHasPhysiciansDiagnosis = {
    
      optPatientHasPhysiciansDiagnosis : [
       {
         categoryId:4,
          controlId:1,
          controlValueId:11,
          controlValue:'Yes'
      }, 
      {
         categoryId:4,
          controlId:1,
          controlValueId:12,
          controlValue:'No'
  
      },
      {
          categoryId:4,
           controlId:1,
           controlValueId:13,
           controlValue:'No, but considered at risk'
   
       }],

       txtSjogrensSymptomsStartMM:{
        categoryId:4,
        controlId:5
      },

      chkSjogrensSymptomsStartMMNA:{
        categoryId:4,
        controlId:6
      },

      txtSjogrensSymptomsStartYYYY:{
        categoryId:4,
        controlId:7
      },

      chkSjogrensSymptomsStartYYYYNA:{
        categoryId:4,
        controlId:8
      },

      txtSjogrensDiagnosisMM:{
        categoryId:4,
        controlId:9
      },

      chkSjogrensDiagnosisMMNA:{
        categoryId:4,
        controlId:10
      },


      txtSjogrensDiagnosisYYYY:{
        categoryId:4,
        controlId:11
      },

      chkSjogrensDiagnosisYYYYNA:{
        categoryId:4,
        controlId:12
      },




  }

  export const alternateDiagnosis = {
    
    optAlternateDiagnosis : [
       {
          categoryId:4,
          controlId:3,
          controlValueId:31,
          controlValue:'Non-inflammatory sicca'
      }, 
      {
          categoryId:4,
          controlId:3,
          controlValueId:32,
          controlValue:'Secondary Sjogren\'s syndrome'
      },
      {
           categoryId:4,
           controlId:3,
           controlValueId:33,
           controlValue:'Other'
       }],

       txtOtherAlternateDiagnosis :{
        categoryId:4,
        controlId:4
      }
  }


/*
    optOcularSymptomsB : [
        {
          categoryId:3,
           controlId:2,
           controlValueId:21,
           controlValue:'Yes'
       }, 
       {
          categoryId:3,
           controlId:2,
           controlValueId:22,
           controlValue:'No'
   
       }],

       optOcularSymptomsC : [
        {
          categoryId:3,
           controlId:3,
           controlValueId:31,
           controlValue:'Yes'
       }, 
       {
          categoryId:3,
           controlId:3,
           controlValueId:32,
           controlValue:'No'
   
       }]
}

export const oralSymptoms = {
    
      optOralSymptomsA : [
       {
         categoryId:3,
          controlId:4,
          controlValueId:41,
          controlValue:'Yes'
      }, 
      {
         categoryId:3,
          controlId:4,
          controlValueId:42,
          controlValue:'No'
  
      }],
     
      optOralSymptomsB : [
          {
            categoryId:3,
             controlId:5,
             controlValueId:51,
             controlValue:'Yes'
         }, 
         {
            categoryId:3,
             controlId:5,
             controlValueId:52,
             controlValue:'No'
     
         }],
  
         optOralSymptomsC : [
          {
            categoryId:3,
             controlId:6,
             controlValueId:61,
             controlValue:'Yes'
         }, 
         {
            categoryId:3,
             controlId:6,
             controlValueId:62,
             controlValue:'No'
     
         }]
  }
  
  
export const ocularSignsObjective = {
    
      optOcularSignsObjectiveA : [
       {
          categoryId:3,
          controlId:7,
          controlValueId:71,
          controlValue:'Yes'
      }, 
      {
          categoryId:3,
          controlId:7,
          controlValueId:72,
          controlValue:'No'
  
      }, 
      {
          categoryId:3,
          controlId:7,
          controlValueId:73,
          controlValue:'N/A'
      }],

      txtOcularSignsObjectiveARight :{
        categoryId:3,
        controlId:8
      },

      txtOcularSignsObjectiveALeft :{
        categoryId:3,
        controlId:9
      },

      optOcularSignsObjectiveB : [
        {
           categoryId:3,
           controlId:10,
           controlValueId:101,
           controlValue:'Yes'
       }, 
       {
           categoryId:3,
           controlId:10,
           controlValueId:102,
           controlValue:'No'
   
       }, 
       {
           categoryId:3,
           controlId:10,
           controlValueId:103,
           controlValue:'N/A'
       }],


       chkOcularSignsObjectiveARightNA :{
        categoryId:3,
        controlId:20
      },

      chkOcularSignsObjectiveALeftNA :{
        categoryId:3,
        controlId:21
      },
  }
  
export const objectiveEvidence = {
    
      optObjectiveEvidenceA : [
       {
          categoryId:3,
          controlId:11,
          controlValueId:111,
          controlValue:'Yes'
      }, 
      {
          categoryId:3,
          controlId:11,
          controlValueId:112,
          controlValue:'No'
  
      }, 
      {
          categoryId:3,
          controlId:11,
          controlValueId:113,
          controlValue:'N/A'
      }],

      txtObjectiveEvidenceAMl :{
        categoryId:3,
        controlId:12
      },

      txtObjectiveEvidenceAMins :{
        categoryId:3,
        controlId:13
      },

      optObjectiveEvidenceB : [
        {
           categoryId:3,
           controlId:14,
           controlValueId:141,
           controlValue:'Yes'
       }, 
       {
           categoryId:3,
           controlId:14,
           controlValueId:142,
           controlValue:'No'
   
       }, 
       {
           categoryId:3,
           controlId:14,
           controlValueId:143,
           controlValue:'N/A'
       }],

       optObjectiveEvidenceC : [
        {
           categoryId:3,
           controlId:15,
           controlValueId:151,
           controlValue:'Yes'
       }, 
       {
           categoryId:3,
           controlId:15,
           controlValueId:152,
           controlValue:'No'
   
       }, 
       {
           categoryId:3,
           controlId:15,
           controlValueId:153,
           controlValue:'N/A'
       }],


    }
  

    
export const histopathology = {
    
      optHistopathologyA : [
       {
          categoryId:3,
          controlId:16,
          controlValueId:161,
          controlValue:'Yes'
      }, 
      {
          categoryId:3,
          controlId:16,
          controlValueId:162,
          controlValue:'No'
  
      }, 
      {
          categoryId:3,
          controlId:16,
          controlValueId:163,
          controlValue:'N/A'
      }],

      txtHistopathologyAYearPerformed :{
        categoryId:3,
        controlId:17
      },

      chkHistopathologyAYearPerformedNA :{
        categoryId:3,
        controlId:22
      }
    }

    export const autoAntibodies = {
        
          optAutoAntibodiesA : [
           {
              categoryId:3,
              controlId:18,
              controlValueId:181,
              controlValue:'Yes'
          }, 
          {
              categoryId:3,
              controlId:18,
              controlValueId:182,
              controlValue:'No'
      
          }],

          optAutoAntibodiesB : [
            {
               categoryId:3,
               controlId:19,
               controlValueId:191,
               controlValue:'Yes'
           }, 
           {
               categoryId:3,
               controlId:19,
               controlValueId:192,
               controlValue:'No'
       
           }]
        }

        */