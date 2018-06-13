import {combineReducers} from 'redux';
import reducerPatientAdd from './reducer-patient-add';
import reducerPatientFind from './reducer-patient-find';
import reducerPatientDetails from './reducer-patient-details';
import reducerPatientMIT from './reducer-patient-mit';
import reducerPatientBaseline from './reducer-patient-baseline';
import reducerPatientState from './reducer-patient-state';
import reducerVisitHeader from './reducer-visit-header';
import reducerNewAttendanceHeader from './reducer-new-attendance-header';
import reducerVisitHeaders from './reducer-visit-headers';
import reducerVisitCategories from './reducer-visit-categories';
import reducerVisit from './reducer-visit';
import reducerVisitKeyValues from './reducer-visit-key-values';
import reducerVisitControlValues from './reducer-visit-control-values';
import reducerConsent from './reducer-consent';
import reducerSpineAdd from './reducer-spine-add';
import reducerSpine from './reducer-spine';
import reducerSpineDetails from './reducer-spine-details';
import reducerConfig from './reducer-config';

//import reducerVisitHeaderDuplicate from './reducer-visit-header-duplicate';
//import reducerVisit from './reducer-visit';
/*
 * We combine all reducers into a single object before updated data is dispatched (sent) to store
 * Your entire applications state (store) is just whatever gets returned from all your reducers
 * */
const allReducers = combineReducers({
    /*We can refer to our data as patientAddResult throughout application */
    patientAddResult:reducerPatientAdd,
    patientFindResult:reducerPatientFind,
    patientDetailsResult:reducerPatientDetails,
    patientMITResult:reducerPatientMIT,    
    patientBaselineResult:reducerPatientBaseline,    
    patientStateResult:reducerPatientState,
    visitCategoriesResult:reducerVisitCategories,
    visitHeadersResult:reducerVisitHeaders,
    visitHeaderResult:reducerVisitHeader, 
    newAttendanceHeaderResult:reducerNewAttendanceHeader,
    visitResult:reducerVisit,
    visitKeyValuesResult:reducerVisitKeyValues,
    visitControlValuesResult:reducerVisitControlValues,
    consentResult:reducerConsent,
    spineAddResult:reducerSpineAdd,
    spineResult:reducerSpine,
    spineDetailsResult:reducerSpineDetails,
    configResult: reducerConfig 
 });

export default allReducers