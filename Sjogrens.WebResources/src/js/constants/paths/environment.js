import {environmentConfig} from './enums';
import {LOCAL_API,DEV_API,QA_API,CAMBRIDGE_API,CARLISLE_API,CANTERBURY_API,WELLS_API,WORCESTER_API, CPQA1_API, CPQA2_API, CPQA_API, CETO_API} from './webapi.js';
import {IIS_BASE,INDEX_BASE,ADMIN_BASE,PATIENT_BASE,BASELINE_BASE,SUMMARY_BASE,
        VISIT_BASE,
        VISIT_AMERICANEUROPEANCGC,
        VISIT_DIAGNOSIS,
        VISIT_CURRENTMEDICATIONS,
        VISIT_ESSPRI,
        VISIT_ESSDAI,
        VISIT_ACTIVITYSCORE,
        VISIT_DAMAGEINDICES,
        VISIT_PASTMEDICALHISTORY,
        VISIT_INVESTIGATIONSREQUESTED,
        VISIT_ULTRASOUNDRESULTS,
        VISIT_SALIVARYFLOW,
        VISIT_ROUTINEBLOODS,
        VISIT_RESEARCHBLOODS,
        VISIT_OTHERRESEARCHBIOMATERIALS,
        VISIT_CLINICALORALDRYNESSSCORE,
        VISIT_OCULARSURFACESTAININGSCORE,
        VISIT_FATFREEMASS
        } from './routes.js';
import {IIS_BASE_LINK,INDEX_BASE_LINK,ADMIN_BASE_LINK,PATIENT_BASE_LINK,VISIT_BASE_LINK,VISIT_NEW_BASE_LINK } from './links.js';
import {LOADER_BASE,PAGE_NOT_FOUND} from './paths.js'

/*
Path: local, paisley, perth, cambridge, carlisle, canterbury, wells, worcester, cpqa1, cpqa2, cpqa
*/

var url = location.hostname;
var sourceString = url.replace('http://','').replace('https://','').replace('www.','').split(/[/?#]/)[0];
//alert(sourceString);

var  environment= null; //environmentConfig.local;

switch(sourceString.toLowerCase()){
        case 'localhost': 
                environment=environmentConfig.local 
                break;
                case 'paisley': 
                environment=environmentConfig.paisley 
                break;
                case 'perth': 
                environment=environmentConfig.perth 
                break;
                case 'cpqa': 
                environment=environmentConfig.cpqa 
                break;
                case 'ceto': 
                environment=environmentConfig.ceto 
                break;
        }


let paths_tmp = {};

switch(environment) { 
   case environmentConfig.local: { 
    paths_tmp = {
            api: LOCAL_API,
            index: INDEX_BASE,
            admin: ADMIN_BASE,
            patient: PATIENT_BASE,
            baseline: BASELINE_BASE,
            summary: SUMMARY_BASE,
            visit: VISIT_BASE,            
            visitAmericanEuropeanCGC: VISIT_AMERICANEUROPEANCGC,
            visitDiagnosis: VISIT_DIAGNOSIS,
            visitCurrentMedications: VISIT_CURRENTMEDICATIONS,
            visitESSPRI: VISIT_ESSPRI,
            visitESSDAI: VISIT_ESSDAI,
            visitActivityScore: VISIT_ACTIVITYSCORE,
            visitDamageIndices: VISIT_DAMAGEINDICES,
            visitPastMedicalHistory: VISIT_PASTMEDICALHISTORY,
            visitInvestigationsRequested: VISIT_INVESTIGATIONSREQUESTED,
            visitUltrasoundResults: VISIT_ULTRASOUNDRESULTS,
            visitSalivaryFlow: VISIT_SALIVARYFLOW,
            visitRoutineBloods: VISIT_ROUTINEBLOODS,
            visitResearchBloods: VISIT_RESEARCHBLOODS,
            visitOtherResearchBiomaterials: VISIT_OTHERRESEARCHBIOMATERIALS,
            visitClinicalOralDrynessScore: VISIT_CLINICALORALDRYNESSSCORE,
            visitOcularSurfaceStainingScore: VISIT_OCULARSURFACESTAININGSCORE,
            visitFatFreeMass: VISIT_FATFREEMASS,
            visit: VISIT_BASE,
            indexLink: INDEX_BASE_LINK,
            adminLink: ADMIN_BASE_LINK,
            patientLink : PATIENT_BASE_LINK,
            visitLink: VISIT_BASE_LINK,
            loader: LOADER_BASE,
            pageNotFound :PAGE_NOT_FOUND
       }
        break; 
   } 
   case environmentConfig.paisley: { 
    paths_tmp = {
            api: DEV_API,
            index: IIS_BASE + INDEX_BASE,
            admin: IIS_BASE + ADMIN_BASE,
            patient: IIS_BASE + PATIENT_BASE,
            baseline: IIS_BASE + BASELINE_BASE,
            summary: IIS_BASE + SUMMARY_BASE,
            visit: IIS_BASE + VISIT_BASE,
            visitAmericanEuropeanCGC: IIS_BASE + VISIT_AMERICANEUROPEANCGC,
            visitDiagnosis: IIS_BASE + VISIT_DIAGNOSIS,
            visitCurrentMedications: IIS_BASE + VISIT_CURRENTMEDICATIONS,
            visitESSPRI: IIS_BASE + VISIT_ESSPRI,
            visitESSDAI: IIS_BASE + VISIT_ESSDAI,
            visitActivityScore: IIS_BASE + VISIT_ACTIVITYSCORE,
            visitDamageIndices: IIS_BASE + VISIT_DAMAGEINDICES,
            visitPastMedicalHistory: IIS_BASE + VISIT_PASTMEDICALHISTORY,
            visitInvestigationsRequested: IIS_BASE + VISIT_INVESTIGATIONSREQUESTED,
            visitUltrasoundResults: IIS_BASE + VISIT_ULTRASOUNDRESULTS,
            visitSalivaryFlow: IIS_BASE + VISIT_SALIVARYFLOW,
            visitRoutineBloods: IIS_BASE + VISIT_ROUTINEBLOODS,
            visitResearchBloods: IIS_BASE + VISIT_RESEARCHBLOODS,
            visitOtherResearchBiomaterials: IIS_BASE + VISIT_OTHERRESEARCHBIOMATERIALS,
            visitClinicalOralDrynessScore: IIS_BASE + VISIT_CLINICALORALDRYNESSSCORE,
            visitOcularSurfaceStainingScore:  IIS_BASE + VISIT_OCULARSURFACESTAININGSCORE,
            visitFatFreeMass: IIS_BASE + VISIT_FATFREEMASS,
          //  visitNew: IIS_BASE + VISIT_NEW_BASE,
            indexLink: IIS_BASE_LINK + INDEX_BASE_LINK,
            adminLink: IIS_BASE_LINK + ADMIN_BASE_LINK,
            patientLink : IIS_BASE_LINK + PATIENT_BASE_LINK,
            visitLink : IIS_BASE_LINK + VISIT_BASE_LINK,
            loader:  IIS_BASE_LINK + LOADER_BASE,
            pageNotFound : IIS_BASE_LINK + PAGE_NOT_FOUND
           }
        break; 
   }
   case environmentConfig.perth: { 
    paths_tmp = {
            api: QA_API,
            index: IIS_BASE + INDEX_BASE,
            admin: IIS_BASE + ADMIN_BASE,
            patient: IIS_BASE + PATIENT_BASE,
            baseline: IIS_BASE + BASELINE_BASE,
            summary: IIS_BASE + SUMMARY_BASE,
            visit: IIS_BASE + VISIT_BASE,
            visitAmericanEuropeanCGC: IIS_BASE + VISIT_AMERICANEUROPEANCGC,
            visitDiagnosis: IIS_BASE + VISIT_DIAGNOSIS,
            visitCurrentMedications: IIS_BASE + VISIT_CURRENTMEDICATIONS,
            visitESSPRI: IIS_BASE + VISIT_ESSPRI,
            visitESSDAI: IIS_BASE + VISIT_ESSDAI,
            visitActivityScore: IIS_BASE + VISIT_ACTIVITYSCORE,
            visitDamageIndices: IIS_BASE + VISIT_DAMAGEINDICES,
            visitPastMedicalHistory: IIS_BASE + VISIT_PASTMEDICALHISTORY,
            visitInvestigationsRequested: IIS_BASE + VISIT_INVESTIGATIONSREQUESTED,
            visitUltrasoundResults: IIS_BASE + VISIT_ULTRASOUNDRESULTS,
            visitSalivaryFlow: IIS_BASE + VISIT_SALIVARYFLOW,
            visitRoutineBloods: IIS_BASE + VISIT_ROUTINEBLOODS,
            visitResearchBloods: IIS_BASE + VISIT_RESEARCHBLOODS,
            visitOtherResearchBiomaterials: IIS_BASE + VISIT_OTHERRESEARCHBIOMATERIALS,
            visitClinicalOralDrynessScore: IIS_BASE + VISIT_CLINICALORALDRYNESSSCORE,
            visitOcularSurfaceStainingScore:  IIS_BASE + VISIT_OCULARSURFACESTAININGSCORE,
            visitFatFreeMass: IIS_BASE + VISIT_FATFREEMASS,
            //visitNew: IIS_BASE + VISIT_NEW_BASE,
            indexLink: IIS_BASE_LINK + INDEX_BASE_LINK,
            adminLink: IIS_BASE_LINK + ADMIN_BASE_LINK,
            patientLink : IIS_BASE_LINK + PATIENT_BASE_LINK,
            visitLink : IIS_BASE_LINK + VISIT_BASE_LINK,
            loader:  IIS_BASE_LINK + LOADER_BASE,
            pageNotFound : IIS_BASE_LINK + PAGE_NOT_FOUND
           }
        break;    
   } 
   case environmentConfig.cambridge: { 
    paths_tmp = {
            api: CAMBRIDGE_API,
            index: IIS_BASE + INDEX_BASE,
            admin: IIS_BASE + ADMIN_BASE,
            patient: IIS_BASE + PATIENT_BASE,
            baseline: IIS_BASE + BASELINE_BASE,
            summary: IIS_BASE + SUMMARY_BASE,
            visit: IIS_BASE + VISIT_BASE,
            visitAmericanEuropeanCGC: IIS_BASE + VISIT_AMERICANEUROPEANCGC,
            visitDiagnosis: IIS_BASE + VISIT_DIAGNOSIS,
            visitCurrentMedications: IIS_BASE + VISIT_CURRENTMEDICATIONS,
            visitESSPRI: IIS_BASE + VISIT_ESSPRI,
            visitESSDAI: IIS_BASE + VISIT_ESSDAI,
            visitActivityScore: IIS_BASE + VISIT_ACTIVITYSCORE,
            visitDamageIndices: IIS_BASE + VISIT_DAMAGEINDICES,
            visitPastMedicalHistory: IIS_BASE + VISIT_PASTMEDICALHISTORY,
            visitInvestigationsRequested: IIS_BASE + VISIT_INVESTIGATIONSREQUESTED,
            visitUltrasoundResults: IIS_BASE + VISIT_ULTRASOUNDRESULTS,
            visitSalivaryFlow: IIS_BASE + VISIT_SALIVARYFLOW,
            visitRoutineBloods: IIS_BASE + VISIT_ROUTINEBLOODS,
            visitResearchBloods: IIS_BASE + VISIT_RESEARCHBLOODS,
            visitOtherResearchBiomaterials: IIS_BASE + VISIT_OTHERRESEARCHBIOMATERIALS,
            visitClinicalOralDrynessScore: IIS_BASE + VISIT_CLINICALORALDRYNESSSCORE,
            visitOcularSurfaceStainingScore:  IIS_BASE + VISIT_OCULARSURFACESTAININGSCORE,
            visitFatFreeMass: IIS_BASE + VISIT_FATFREEMASS,
           // visitNew: IIS_BASE + VISIT_NEW_BASE,
            indexLink: IIS_BASE_LINK + INDEX_BASE_LINK,
            adminLink: IIS_BASE_LINK + ADMIN_BASE_LINK,
            patientLink : IIS_BASE_LINK + PATIENT_BASE_LINK,
            visitLink : IIS_BASE_LINK + VISIT_BASE_LINK,
            loader:  IIS_BASE_LINK + LOADER_BASE,
            pageNotFound : IIS_BASE_LINK + PAGE_NOT_FOUND
           }
        break; 
   }  
   case environmentConfig.carlisle: { 
    paths_tmp = {
            api: CARLISLE_API,
            index: IIS_BASE + INDEX_BASE,
            admin: IIS_BASE + ADMIN_BASE,
            patient: IIS_BASE + PATIENT_BASE,
            baseline: IIS_BASE + BASELINE_BASE,
            summary: IIS_BASE + SUMMARY_BASE,
            visit: IIS_BASE + VISIT_BASE,
            visitAmericanEuropeanCGC: IIS_BASE + VISIT_AMERICANEUROPEANCGC,
            visitDiagnosis: IIS_BASE + VISIT_DIAGNOSIS,
            visitCurrentMedications: IIS_BASE + VISIT_CURRENTMEDICATIONS,
            visitESSPRI: IIS_BASE + VISIT_ESSPRI,
            visitESSDAI: IIS_BASE + VISIT_ESSDAI,
            visitActivityScore: IIS_BASE + VISIT_ACTIVITYSCORE,
            visitDamageIndices: IIS_BASE + VISIT_DAMAGEINDICES,
            visitPastMedicalHistory: IIS_BASE + VISIT_PASTMEDICALHISTORY,
            visitInvestigationsRequested: IIS_BASE + VISIT_INVESTIGATIONSREQUESTED,
            visitUltrasoundResults: IIS_BASE + VISIT_ULTRASOUNDRESULTS,
            visitSalivaryFlow: IIS_BASE + VISIT_SALIVARYFLOW,
            visitRoutineBloods: IIS_BASE + VISIT_ROUTINEBLOODS,
            visitResearchBloods: IIS_BASE + VISIT_RESEARCHBLOODS,
            visitOtherResearchBiomaterials: IIS_BASE + VISIT_OTHERRESEARCHBIOMATERIALS,
            visitClinicalOralDrynessScore: IIS_BASE + VISIT_CLINICALORALDRYNESSSCORE,
            visitOcularSurfaceStainingScore:  IIS_BASE + VISIT_OCULARSURFACESTAININGSCORE,
            visitFatFreeMass: IIS_BASE + VISIT_FATFREEMASS,
            //visitNew: IIS_BASE + VISIT_NEW_BASE,
            indexLink: IIS_BASE_LINK + INDEX_BASE_LINK,
            adminLink: IIS_BASE_LINK + ADMIN_BASE_LINK,
            patientLink : IIS_BASE_LINK + PATIENT_BASE_LINK,
            visitLink : IIS_BASE_LINK + VISIT_BASE_LINK,
            loader:  IIS_BASE_LINK + LOADER_BASE,
            pageNotFound : IIS_BASE_LINK + PAGE_NOT_FOUND
           }
        break; 
   }
   case environmentConfig.canterbury: { 
    paths_tmp = {
            api: CANTERBURY_API,
            index: IIS_BASE + INDEX_BASE,
            admin: IIS_BASE + ADMIN_BASE,
            patient: IIS_BASE + PATIENT_BASE,
            baseline: IIS_BASE + BASELINE_BASE,
            summary: IIS_BASE + SUMMARY_BASE,
            visit: IIS_BASE + VISIT_BASE,
            visitAmericanEuropeanCGC: IIS_BASE + VISIT_AMERICANEUROPEANCGC,
            visitDiagnosis: IIS_BASE + VISIT_DIAGNOSIS,
            visitCurrentMedications: IIS_BASE + VISIT_CURRENTMEDICATIONS,
            visitESSPRI: IIS_BASE + VISIT_ESSPRI,
            visitESSDAI: IIS_BASE + VISIT_ESSDAI,
            visitActivityScore: IIS_BASE + VISIT_ACTIVITYSCORE,
            visitDamageIndices: IIS_BASE + VISIT_DAMAGEINDICES,
            visitPastMedicalHistory: IIS_BASE + VISIT_PASTMEDICALHISTORY,
            visitInvestigationsRequested: IIS_BASE + VISIT_INVESTIGATIONSREQUESTED,
            visitUltrasoundResults: IIS_BASE + VISIT_ULTRASOUNDRESULTS,
            visitSalivaryFlow: IIS_BASE + VISIT_SALIVARYFLOW,
            visitRoutineBloods: IIS_BASE + VISIT_ROUTINEBLOODS,
            visitResearchBloods: IIS_BASE + VISIT_RESEARCHBLOODS,
            visitOtherResearchBiomaterials: IIS_BASE + VISIT_OTHERRESEARCHBIOMATERIALS,
            visitClinicalOralDrynessScore: IIS_BASE + VISIT_CLINICALORALDRYNESSSCORE,
            visitOcularSurfaceStainingScore:  IIS_BASE + VISIT_OCULARSURFACESTAININGSCORE,
            visitFatFreeMass: IIS_BASE + VISIT_FATFREEMASS,
            //visitNew: IIS_BASE + VISIT_NEW_BASE,
            indexLink: IIS_BASE_LINK + INDEX_BASE_LINK,
            adminLink: IIS_BASE_LINK + ADMIN_BASE_LINK,
            patientLink : IIS_BASE_LINK + PATIENT_BASE_LINK,
            visitLink : IIS_BASE_LINK + VISIT_BASE_LINK,
            loader:  IIS_BASE_LINK + LOADER_BASE,
            pageNotFound : IIS_BASE_LINK + PAGE_NOT_FOUND
           }
        break; 
        }
        case environmentConfig.wells: { 
         paths_tmp = {
                 api: WELLS_API,
                 index: IIS_BASE + INDEX_BASE,
                 admin: IIS_BASE + ADMIN_BASE,
                 patient: IIS_BASE + PATIENT_BASE,
                 baseline: IIS_BASE + BASELINE_BASE,
                 summary: IIS_BASE + SUMMARY_BASE,
                 visit: IIS_BASE + VISIT_BASE,
                 visitAmericanEuropeanCGC: IIS_BASE + VISIT_AMERICANEUROPEANCGC,
                 visitDiagnosis: IIS_BASE + VISIT_DIAGNOSIS,
                 visitCurrentMedications: IIS_BASE + VISIT_CURRENTMEDICATIONS,
                 visitESSPRI: IIS_BASE + VISIT_ESSPRI,
                 visitESSDAI: IIS_BASE + VISIT_ESSDAI,
                 visitActivityScore: IIS_BASE + VISIT_ACTIVITYSCORE,
                 visitDamageIndices: IIS_BASE + VISIT_DAMAGEINDICES,
                 visitPastMedicalHistory: IIS_BASE + VISIT_PASTMEDICALHISTORY,
                 visitInvestigationsRequested: IIS_BASE + VISIT_INVESTIGATIONSREQUESTED,
                 visitUltrasoundResults: IIS_BASE + VISIT_ULTRASOUNDRESULTS,
                 visitSalivaryFlow: IIS_BASE + VISIT_SALIVARYFLOW,
                 visitRoutineBloods: IIS_BASE + VISIT_ROUTINEBLOODS,
                 visitResearchBloods: IIS_BASE + VISIT_RESEARCHBLOODS,
                 visitOtherResearchBiomaterials: IIS_BASE + VISIT_OTHERRESEARCHBIOMATERIALS,
                 visitClinicalOralDrynessScore: IIS_BASE + VISIT_CLINICALORALDRYNESSSCORE,
                 visitOcularSurfaceStainingScore:  IIS_BASE + VISIT_OCULARSURFACESTAININGSCORE,
                 visitFatFreeMass: IIS_BASE + VISIT_FATFREEMASS,
                // visitNew: IIS_BASE + VISIT_NEW_BASE,
                 indexLink: IIS_BASE_LINK + INDEX_BASE_LINK,
                 adminLink: IIS_BASE_LINK + ADMIN_BASE_LINK,
                 patientLink : IIS_BASE_LINK + PATIENT_BASE_LINK,
                 visitLink : IIS_BASE_LINK + VISIT_BASE_LINK,
                 loader:  IIS_BASE_LINK + LOADER_BASE,
                 pageNotFound : IIS_BASE_LINK + PAGE_NOT_FOUND
                }
             break; 
    }
    case environmentConfig.worcester: { 
     paths_tmp = {
             api: WORCESTER_API,
             index: IIS_BASE + INDEX_BASE,
             admin: IIS_BASE + ADMIN_BASE,
             patient: IIS_BASE + PATIENT_BASE,
             baseline: IIS_BASE + BASELINE_BASE,
             summary: IIS_BASE + SUMMARY_BASE,
             visit: IIS_BASE + VISIT_BASE,
             visitAmericanEuropeanCGC: IIS_BASE + VISIT_AMERICANEUROPEANCGC,
             visitDiagnosis: IIS_BASE + VISIT_DIAGNOSIS,
             visitCurrentMedications: IIS_BASE + VISIT_CURRENTMEDICATIONS,
             visitESSPRI: IIS_BASE + VISIT_ESSPRI,
             visitESSDAI: IIS_BASE + VISIT_ESSDAI,
             visitActivityScore: IIS_BASE + VISIT_ACTIVITYSCORE,
             visitDamageIndices: IIS_BASE + VISIT_DAMAGEINDICES,
             visitPastMedicalHistory: IIS_BASE + VISIT_PASTMEDICALHISTORY,
             visitInvestigationsRequested: IIS_BASE + VISIT_INVESTIGATIONSREQUESTED,
             visitUltrasoundResults: IIS_BASE + VISIT_ULTRASOUNDRESULTS,
             visitSalivaryFlow: IIS_BASE + VISIT_SALIVARYFLOW,
             visitRoutineBloods: IIS_BASE + VISIT_ROUTINEBLOODS,
             visitResearchBloods: IIS_BASE + VISIT_RESEARCHBLOODS,
             visitOtherResearchBiomaterials: IIS_BASE + VISIT_OTHERRESEARCHBIOMATERIALS,
             visitClinicalOralDrynessScore: IIS_BASE + VISIT_CLINICALORALDRYNESSSCORE,
             visitOcularSurfaceStainingScore:  IIS_BASE + VISIT_OCULARSURFACESTAININGSCORE,
             visitFatFreeMass: IIS_BASE + VISIT_FATFREEMASS,
             //visitNew: IIS_BASE + VISIT_NEW_BASE,
             indexLink: IIS_BASE_LINK + INDEX_BASE_LINK,
             adminLink: IIS_BASE_LINK + ADMIN_BASE_LINK,
             patientLink : IIS_BASE_LINK + PATIENT_BASE_LINK,
             visitLink : IIS_BASE_LINK + VISIT_BASE_LINK,
             loader:  IIS_BASE_LINK + LOADER_BASE,
             pageNotFound : IIS_BASE_LINK + PAGE_NOT_FOUND
            }
         break; 
         }
         case environmentConfig.cpqa1: { 
                paths_tmp = {
                        api: CPQA1_API,
                        index: IIS_BASE + INDEX_BASE,
                        admin: IIS_BASE + ADMIN_BASE,
                        patient: IIS_BASE + PATIENT_BASE,
                        baseline: IIS_BASE + BASELINE_BASE,
                        summary: IIS_BASE + SUMMARY_BASE,
                        visit: IIS_BASE + VISIT_BASE,
                        visitAmericanEuropeanCGC: IIS_BASE + VISIT_AMERICANEUROPEANCGC,
                        visitDiagnosis: IIS_BASE + VISIT_DIAGNOSIS,
                        visitCurrentMedications: IIS_BASE + VISIT_CURRENTMEDICATIONS,
                        visitESSPRI: IIS_BASE + VISIT_ESSPRI,
                        visitESSDAI: IIS_BASE + VISIT_ESSDAI,
                        visitActivityScore: IIS_BASE + VISIT_ACTIVITYSCORE,
                        visitDamageIndices: IIS_BASE + VISIT_DAMAGEINDICES,
                        visitPastMedicalHistory: IIS_BASE + VISIT_PASTMEDICALHISTORY,
                        visitInvestigationsRequested: IIS_BASE + VISIT_INVESTIGATIONSREQUESTED,
                        visitUltrasoundResults: IIS_BASE + VISIT_ULTRASOUNDRESULTS,
                        visitSalivaryFlow: IIS_BASE + VISIT_SALIVARYFLOW,
                        visitRoutineBloods: IIS_BASE + VISIT_ROUTINEBLOODS,
                        visitResearchBloods: IIS_BASE + VISIT_RESEARCHBLOODS,
                        visitOtherResearchBiomaterials: IIS_BASE + VISIT_OTHERRESEARCHBIOMATERIALS,
                        visitClinicalOralDrynessScore: IIS_BASE + VISIT_CLINICALORALDRYNESSSCORE,
                        visitOcularSurfaceStainingScore:  IIS_BASE + VISIT_OCULARSURFACESTAININGSCORE,
                        visitFatFreeMass: IIS_BASE + VISIT_FATFREEMASS,
                        //visitNew: IIS_BASE + VISIT_NEW_BASE,
                        indexLink: IIS_BASE_LINK + INDEX_BASE_LINK,
                        adminLink: IIS_BASE_LINK + ADMIN_BASE_LINK,
                        patientLink : IIS_BASE_LINK + PATIENT_BASE_LINK,
                        visitLink : IIS_BASE_LINK + VISIT_BASE_LINK,
                        loader:  IIS_BASE_LINK + LOADER_BASE,
                        pageNotFound : IIS_BASE_LINK + PAGE_NOT_FOUND
                       }
                    break; 
                    }      
        case environmentConfig.cpqa2: { 
                        paths_tmp = {
                                api: CPQA2_API,
                                index: IIS_BASE + INDEX_BASE,
                                admin: IIS_BASE + ADMIN_BASE,
                                patient: IIS_BASE + PATIENT_BASE,
                                baseline: IIS_BASE + BASELINE_BASE,
                                summary: IIS_BASE + SUMMARY_BASE,
                                visit: IIS_BASE + VISIT_BASE,
                                visitAmericanEuropeanCGC: IIS_BASE + VISIT_AMERICANEUROPEANCGC,
                                visitDiagnosis: IIS_BASE + VISIT_DIAGNOSIS,
                                visitCurrentMedications: IIS_BASE + VISIT_CURRENTMEDICATIONS,
                                visitESSPRI: IIS_BASE + VISIT_ESSPRI,
                                visitESSDAI: IIS_BASE + VISIT_ESSDAI,
                                visitActivityScore: IIS_BASE + VISIT_ACTIVITYSCORE,
                                visitDamageIndices: IIS_BASE + VISIT_DAMAGEINDICES,
                                visitPastMedicalHistory: IIS_BASE + VISIT_PASTMEDICALHISTORY,
                                visitInvestigationsRequested: IIS_BASE + VISIT_INVESTIGATIONSREQUESTED,
                                visitUltrasoundResults: IIS_BASE + VISIT_ULTRASOUNDRESULTS,
                                visitSalivaryFlow: IIS_BASE + VISIT_SALIVARYFLOW,
                                visitRoutineBloods: IIS_BASE + VISIT_ROUTINEBLOODS,
                                visitResearchBloods: IIS_BASE + VISIT_RESEARCHBLOODS,
                                visitOtherResearchBiomaterials: IIS_BASE + VISIT_OTHERRESEARCHBIOMATERIALS,
                                visitClinicalOralDrynessScore: IIS_BASE + VISIT_CLINICALORALDRYNESSSCORE,
                                visitOcularSurfaceStainingScore:  IIS_BASE + VISIT_OCULARSURFACESTAININGSCORE,
                                visitFatFreeMass: IIS_BASE + VISIT_FATFREEMASS,
                                //visitNew: IIS_BASE + VISIT_NEW_BASE,
                                indexLink: IIS_BASE_LINK + INDEX_BASE_LINK,
                                adminLink: IIS_BASE_LINK + ADMIN_BASE_LINK,
                                patientLink : IIS_BASE_LINK + PATIENT_BASE_LINK,
                                visitLink : IIS_BASE_LINK + VISIT_BASE_LINK,
                                loader:  IIS_BASE_LINK + LOADER_BASE,
                                pageNotFound : IIS_BASE_LINK + PAGE_NOT_FOUND
                               }
                            break; 
                            }      

                            case environmentConfig.cpqa: { 
                                paths_tmp = {
                                        api: CPQA_API,
                                        index: IIS_BASE + INDEX_BASE,
                                        admin: IIS_BASE + ADMIN_BASE,
                                        patient: IIS_BASE + PATIENT_BASE,
                                        baseline: IIS_BASE + BASELINE_BASE,
                                        summary: IIS_BASE + SUMMARY_BASE,
                                        visit: IIS_BASE + VISIT_BASE,
                                        visitAmericanEuropeanCGC: IIS_BASE + VISIT_AMERICANEUROPEANCGC,
                                        visitDiagnosis: IIS_BASE + VISIT_DIAGNOSIS,
                                        visitCurrentMedications: IIS_BASE + VISIT_CURRENTMEDICATIONS,
                                        visitESSPRI: IIS_BASE + VISIT_ESSPRI,
                                        visitESSDAI: IIS_BASE + VISIT_ESSDAI,
                                        visitActivityScore: IIS_BASE + VISIT_ACTIVITYSCORE,
                                        visitDamageIndices: IIS_BASE + VISIT_DAMAGEINDICES,
                                        visitPastMedicalHistory: IIS_BASE + VISIT_PASTMEDICALHISTORY,
                                        visitInvestigationsRequested: IIS_BASE + VISIT_INVESTIGATIONSREQUESTED,
                                        visitUltrasoundResults: IIS_BASE + VISIT_ULTRASOUNDRESULTS,
                                        visitSalivaryFlow: IIS_BASE + VISIT_SALIVARYFLOW,
                                        visitRoutineBloods: IIS_BASE + VISIT_ROUTINEBLOODS,
                                        visitResearchBloods: IIS_BASE + VISIT_RESEARCHBLOODS,
                                        visitOtherResearchBiomaterials: IIS_BASE + VISIT_OTHERRESEARCHBIOMATERIALS,
                                        visitClinicalOralDrynessScore: IIS_BASE + VISIT_CLINICALORALDRYNESSSCORE,
                                        visitOcularSurfaceStainingScore:  IIS_BASE + VISIT_OCULARSURFACESTAININGSCORE,
                                        visitFatFreeMass: IIS_BASE + VISIT_FATFREEMASS,
                                        //visitNew: IIS_BASE + VISIT_NEW_BASE,
                                        indexLink: IIS_BASE_LINK + INDEX_BASE_LINK,
                                        adminLink: IIS_BASE_LINK + ADMIN_BASE_LINK,
                                        patientLink : IIS_BASE_LINK + PATIENT_BASE_LINK,
                                        visitLink : IIS_BASE_LINK + VISIT_BASE_LINK,
                                        loader:  IIS_BASE_LINK + LOADER_BASE,
                                        pageNotFound : IIS_BASE_LINK + PAGE_NOT_FOUND
                                       }
                                    break; 
                                    }      



                                    case environmentConfig.ceto: { 
                                        paths_tmp = {
                                                api: CETO_API,
                                                index: IIS_BASE + INDEX_BASE,
                                                admin: IIS_BASE + ADMIN_BASE,
                                                patient: IIS_BASE + PATIENT_BASE,
                                                baseline: IIS_BASE + BASELINE_BASE,
                                                summary: IIS_BASE + SUMMARY_BASE,
                                                visit: IIS_BASE + VISIT_BASE,
                                                visitAmericanEuropeanCGC: IIS_BASE + VISIT_AMERICANEUROPEANCGC,
                                                visitDiagnosis: IIS_BASE + VISIT_DIAGNOSIS,
                                                visitCurrentMedications: IIS_BASE + VISIT_CURRENTMEDICATIONS,
                                                visitESSPRI: IIS_BASE + VISIT_ESSPRI,
                                                visitESSDAI: IIS_BASE + VISIT_ESSDAI,
                                                visitActivityScore: IIS_BASE + VISIT_ACTIVITYSCORE,
                                                visitDamageIndices: IIS_BASE + VISIT_DAMAGEINDICES,
                                                visitPastMedicalHistory: IIS_BASE + VISIT_PASTMEDICALHISTORY,
                                                visitInvestigationsRequested: IIS_BASE + VISIT_INVESTIGATIONSREQUESTED,
                                                visitUltrasoundResults: IIS_BASE + VISIT_ULTRASOUNDRESULTS,
                                                visitSalivaryFlow: IIS_BASE + VISIT_SALIVARYFLOW,
                                                visitRoutineBloods: IIS_BASE + VISIT_ROUTINEBLOODS,
                                                visitResearchBloods: IIS_BASE + VISIT_RESEARCHBLOODS,
                                                visitOtherResearchBiomaterials: IIS_BASE + VISIT_OTHERRESEARCHBIOMATERIALS,
                                                visitClinicalOralDrynessScore: IIS_BASE + VISIT_CLINICALORALDRYNESSSCORE,
                                                visitOcularSurfaceStainingScore:  IIS_BASE + VISIT_OCULARSURFACESTAININGSCORE,
                                                visitFatFreeMass: IIS_BASE + VISIT_FATFREEMASS,
                                                //visitNew: IIS_BASE + VISIT_NEW_BASE,
                                                indexLink: IIS_BASE_LINK + INDEX_BASE_LINK,
                                                adminLink: IIS_BASE_LINK + ADMIN_BASE_LINK,
                                                patientLink : IIS_BASE_LINK + PATIENT_BASE_LINK,
                                                visitLink : IIS_BASE_LINK + VISIT_BASE_LINK,
                                                loader:  IIS_BASE_LINK + LOADER_BASE,
                                                pageNotFound : IIS_BASE_LINK + PAGE_NOT_FOUND
                                               }
                                            break; 
                                            }    



   default: { 
    paths_tmp = {
        api: LOCAL_API,
        index: INDEX_BASE,
        admin: ADMIN_BASE,
        patient: PATIENT_BASE,
        baseline: BASELINE_BASE,
        summary: SUMMARY_BASE,
        visit: VISIT_BASE,
        visitAmericanEuropeanCGC: VISIT_AMERICANEUROPEANCGC,
        visitDiagnosis: VISIT_DIAGNOSIS,
        visitCurrentMedications: VISIT_CURRENTMEDICATIONS,
        visitESSPRI:  VISIT_ESSPRI,
        visitESSDAI: VISIT_ESSDAI,
        visitActivityScore: VISIT_ACTIVITYSCORE,
        visitDamageIndices: VISIT_DAMAGEINDICES,
        visitPastMedicalHistory: VISIT_PASTMEDICALHISTORY,
        visitInvestigationsRequested: VISIT_INVESTIGATIONSREQUESTED,
        visitUltrasoundResults: VISIT_ULTRASOUNDRESULTS,
        visitSalivaryFlow: VISIT_SALIVARYFLOW,
        visitRoutineBloods: VISIT_ROUTINEBLOODS,
        visitResearchBloods: VISIT_RESEARCHBLOODS,
        visitOtherResearchBiomaterials: VISIT_OTHERRESEARCHBIOMATERIALS,
        visitClinicalOralDrynessScore: VISIT_CLINICALORALDRYNESSSCORE,
        visitOcularSurfaceStainingScore:   VISIT_OCULARSURFACESTAININGSCORE,
        visitFatFreeMass:  VISIT_FATFREEMASS,
        //visitNew: VISIT_NEW_BASE,
        indexLink: INDEX_BASE_LINK,
        adminLink: ADMIN_BASE_LINK,
        patientLink : PATIENT_BASE_LINK,
        visitLink: VISIT_BASE_LINK,
        loader:  LOADER_BASE,
        pageNotFound : PAGE_NOT_FOUND
       }
    break;              
   } 
}


export const paths = paths_tmp;
