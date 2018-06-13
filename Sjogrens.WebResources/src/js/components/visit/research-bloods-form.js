import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames'
// import { NavLink, Link, Route } from 'react-router-dom'
// import {bindActionCreators} from 'redux';
// import {connect} from 'react-redux';
import PanelDefault from '../../components/generic/panel-default';
import InputGroupAddOnLR from '../../components/generic/input/input-group-add-on-lr';
import InputGroupAddOnR from '../../components/generic/input/input-group-add-on-r';
import InputGroupAddOnL from '../../components/generic/input/input-group-add-on-l';
import AuditData from '../../components/generic/audit-data';
//import Consent from '../../containers/patient/consent';
//import {padDayMonthWithZero,handleDateFormat,handleDateTimeFormat} from '../../factory/date-functions'
import {paths} from '../../constants/paths/environment';
import {patientHasPhysiciansDiagnosis, patientMeetsAECGCriteria, alternateDiagnosis,patientMeets2016ACRECCriteria} from '../../config/controls/diagnosis';
import {serum20mlList,plasma10mlList,pbmc20mlList,rna5mlList,dna8mlList,urineStore5mlList} from '../../config/controls/research-bloods';
import {categories} from '../../config/categories';
import FunkyRadioTwoOptions from '../../components/generic/radio/funky-radio-two-options';
import FadeIn from '../../components/animation/fade-in';
import {isAlpha, isAlphanumericSpace, isAlphanumeric,  validYear,digitsOnly2DecimalPlaces} from '../../Factory/reg-ex';
import {digitsRange,digitsLessThan, salivaryFlowRate} from '../../Factory/calculations';
import {getVisitOptionControlValue, getDetailsControlValue} from '../../Factory/visit';
import {trim, left, right} from 'trim';
import Moment from 'moment';
import {Spinner} from 'belle';
import OnLeavePrompt from '../../components/generic/on-leave-prompt';
import ModalDefault from '../../components/generic/modal-default';
import {VISITCOMPLETE} from '../../constants/styles/modal';
import Flow from '../../components/visit/navigation/flow';
import 
{
    VISIT_CATEGORY_AMERICANEUROPEANCGC,
    VISIT_CATEGORY_DIAGNOSIS,
    VISIT_CATEGORY_CURRENTMEDICATIONS,
    VISIT_CATEGORY_ESSDAI,
    VISIT_CATEGORY_ACTIVITYSCORE,
    VISIT_CATEGORY_DAMAGEINDICES,
    VISIT_CATEGORY_PASTMEDICALHISTORY,
    VISIT_CATEGORY_INVESTIGATIONSREQUESTED,
    VISIT_CATEGORY_ULTRASOUNDRESULTS,
    VISIT_CATEGORY_SALIVARYFLOW,
    VISIT_CATEGORY_ROUTINEBLOODS,
    VISIT_CATEGORY_RESEARCHBLOODS,
    VISIT_CATEGORY_OTHERRESEARCHBIOMATERIALS

} from '../../constants/paths/visit-category-names';

class ResearchBloodsForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            patientMeetsAECGCGCA: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientMeetsAECGCriteria.chkPatientMeetsAECGCriteria,this.props.visitResult.data.details):'',  
            patientMeets2016ACRECCriteria: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientMeets2016ACRECCriteria.chkPatientMeets2016ACRECCriteria,this.props.visitResult.data.details):'',
          
            serum20ml: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getVisitOptionControlValue(categories.researchBloods.id, serum20mlList.optSerum20ml,this.props.visitResult.data.visits):'',
            plasma10ml: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getVisitOptionControlValue(categories.researchBloods.id, plasma10mlList.optPlasma10ml,this.props.visitResult.data.visits):'',
            pbmc20ml: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getVisitOptionControlValue(categories.researchBloods.id, pbmc20mlList.optPBMC20ml,this.props.visitResult.data.visits):'',
            rna5ml: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getVisitOptionControlValue(categories.researchBloods.id, rna5mlList.optRna5ml,this.props.visitResult.data.visits):'',
            dna8ml: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getVisitOptionControlValue(categories.researchBloods.id, dna8mlList.optDNA8ml,this.props.visitResult.data.visits):'',
            urineStore5ml: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getVisitOptionControlValue(categories.researchBloods.id, urineStore5mlList.optUrineStore5ml,this.props.visitResult.data.visits):'',
                 
            createdUser: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.createdUser,
            createdDateTime: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.createdDatetime,
            lastUpdatedUser: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.lastUpdatedUser,
            lastUpdatedDateTime: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.lastUpdatedDatetime,
         
            changed:false,
            errors:{},

            /*Every visit should have start */
            visitCompleteModalOpen: false,
            visitCompletedSaved:false
            /*Every visit should have end*/
          };        

        //   this.handleSaveVisitHeader = this.handleSaveVisitHeader.bind(this);
        //   this.getVisitOptionControlValue = this.getVisitOptionControlValue.bind(this);
        //   this.getDetailsControlValue = this.getDetailsControlValue.bind(this);
         // this.renderInvestigationsRequested = this.renderInvestigationsRequested.bind(this);
          this.renderAuditData = this.renderAuditData.bind(this);   
          
          this.optSerum20ml_onChange = this.optSerum20ml_onChange.bind(this);
          this.optPlasma10ml_onChange = this.optPlasma10ml_onChange.bind(this);
          this.optPBMC20ml_onChange = this.optPBMC20ml_onChange.bind(this);
          this.optRNA5ml_onChange = this.optRNA5ml_onChange.bind(this);
          this.optDNA8ml_onChange = this.optDNA8ml_onChange.bind(this);
          this.optUrineStore5ml_onChange = this.optUrineStore5ml_onChange.bind(this);

          /*Every visit should have start*/
          this.handleSaveVisitHeader = this.handleSaveVisitHeader.bind(this);
          this.handleCompleteVisitHeader = this.handleCompleteVisitHeader.bind(this);
          this.closeVisitCompleteModal = this.closeVisitCompleteModal.bind(this);
          this.afterOpenVisitCompleteModal = this.afterOpenVisitCompleteModal.bind(this);
          this.openVisitCompleteModal = this.openVisitCompleteModal.bind(this);
          this.validateVisit = this.validateVisit.bind(this);
          this.getVisitValues = this.getVisitValues.bind(this);
          this.getDetailValues = this.getDetailValues.bind(this);
          this.renderFieldset = this.renderFieldset.bind(this);
          this.isFormValid = this.isFormValid.bind(this);
          /*Every visit should have end */
    }

    validateVisit(){
        let errors = {};

        this.setState({errors});  
        
        return errors
    }

    optSerum20ml_onChange(e){
         this.setState({
            serum20ml: e.target.value,
             changed:true,
         })
     }

     optPlasma10ml_onChange(e){
         this.setState({
            plasma10ml: e.target.value,
             changed:true,
         })
     }

     
     optPBMC20ml_onChange(e){
         this.setState({
            pbmc20ml: e.target.value,
             changed:true,
         })
     }

     optRNA5ml_onChange(e){
         this.setState({
            rna5ml: e.target.value,
             changed:true,
         })
     }

     optDNA8ml_onChange(e){
         this.setState({
            dna8ml: e.target.value,
             changed:true,
         })
     }

     optUrineStore5ml_onChange(e){
        this.setState({
            urineStore5ml: e.target.value,
            changed:true,
        })
    }


    getVisitValues(){
        var visit = [       
            {
                visitHeaderId:this.props.visitHeaderId,
                controlValueId:this.state.serum20ml,
                controlId:this.state.serum20ml == serum20mlList.optSerum20ml[0].controlValueId ? 
                                serum20mlList.optSerum20ml[0].controlId : 
                          this.state.serum20ml == serum20mlList.optSerum20ml[1].controlValueId ? 
                                serum20mlList.optSerum20ml[1].controlId  :
                         0,
                categoryId:   categories.researchBloods.id             
            },
            {
                visitHeaderId:this.props.visitHeaderId,
                controlValueId:this.state.plasma10ml,
                controlId:this.state.plasma10ml  == plasma10mlList.optPlasma10ml[0].controlValueId ? 
                                plasma10mlList.optPlasma10ml[0].controlId : 
                          this.state.pulmonaryFunctionTests  == plasma10mlList.optPlasma10ml[1].controlValueId ? 
                                plasma10mlList.optPlasma10ml[1].controlId :
                          0,
                categoryId:   categories.researchBloods.id             
            },
            {
                visitHeaderId:this.props.visitHeaderId,
                controlValueId:this.state.pbmc20ml,
                controlId:this.state.pbmc20ml  == pbmc20mlList.optPBMC20ml[0].controlValueId ? 
                                pbmc20mlList.optPBMC20ml[0].controlId : 
                          this.state.pbmc20ml  == pbmc20mlList.optPBMC20ml[1].controlValueId ? 
                                pbmc20mlList.optPBMC20ml[1].controlId :
                          0,
                categoryId:   categories.researchBloods.id             
            },
            {
                visitHeaderId:this.props.visitHeaderId,
                controlValueId:this.state.rna5ml,
                controlId:this.state.rna5ml  == rna5mlList.optRna5ml[0].controlValueId ? 
                                rna5mlList.optRna5ml[0].controlId : 
                          this.state.rna5ml  == rna5mlList.optRna5ml[1].controlValueId ? 
                                rna5mlList.optRna5ml[1].controlId :
                          0,
                categoryId:   categories.researchBloods.id             
            },
            {
                visitHeaderId:this.props.visitHeaderId,
                controlValueId:this.state.dna8ml,
                controlId:this.state.dna8ml  == dna8mlList.optDNA8ml[0].controlValueId ? 
                                dna8mlList.optDNA8ml[0].controlId : 
                          this.state.dna8ml  == dna8mlList.optDNA8ml[1].controlValueId ? 
                                dna8mlList.optDNA8ml[1].controlId :
                          0,
                categoryId:   categories.researchBloods.id             
            },
            {
                visitHeaderId:this.props.visitHeaderId,
                controlValueId:this.state.urineStore5ml,
                controlId:this.state.urineStore5ml  == urineStore5mlList.optUrineStore5ml[0].controlValueId ? 
                                urineStore5mlList.optUrineStore5ml[0].controlId : 
                          this.state.urineStore5ml  == urineStore5mlList.optUrineStore5ml[1].controlValueId ? 
                                urineStore5mlList.optUrineStore5ml[1].controlId :
                          0,
                categoryId:   categories.researchBloods.id             
            }]

            return visit;
    }



    getDetailValues(){
        
            var detail = []

            return detail
    }


/*Every visit shold have this --start */

handleSaveVisitHeader(e){
    e.preventDefault();

    let errors = {};
    errors = this.validateVisit()

    const isValid = Object.keys(errors).length === 0    
   
    if (isValid)
    {
            var visit =  [];
            var detail = [];

            visit = this.getVisitValues();
            detail = this.getDetailValues();

            if (visit) {
                for(var i = visit.length; i--;){
                        if (visit[i].controlId === 0 || visit[i].controlValueId === 0 ) visit.splice(i, 1);
                }
            }

            if (detail) {
                for(var i = detail.length; i--;){
                        if (detail[i].controlId === 0 || detail[i].value === '') detail.splice(i, 1);
                }
            }

            if (visit && detail) {
                this.props.handleSaveVisitHeader(visit, detail,categories.researchBloods.id);
            }
    }
}


handleCompleteVisitHeader(e){
    e.preventDefault();

    let errors = {};
    errors = this.validateVisit()

    const isValid = Object.keys(errors).length === 0    
   
    if (isValid)
    {
        var visit =  [];
        var detail = [];

        visit = this.getVisitValues();
        detail = this.getDetailValues();
        if (visit) {
            for(var i = visit.length; i--;){
                if (visit[i].controlId === 0 || visit[i].controlValueId === 0 ) visit.splice(i, 1);
            }
        }
        if (detail) {
            for(var i = detail.length; i--;){
                if (detail[i].controlId === 0 || detail[i].value === '') detail.splice(i, 1);
            }
        }
        if (visit && detail) {
            this.props.handleCompleteVisitHeader(visit, detail, categories.researchBloods.id   );
        }
    }
    else {
        this.setState({
            visitCompleteModalOpen: false
        })
    }
}
/*Every visit shold have this --end */

    componentWillReceiveProps(nextProps){

      this.setState({
        patientMeetsAECGCGCA: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientMeetsAECGCriteria.chkPatientMeetsAECGCriteria,nextProps.visitResult.data.details):'',
        patientHasPhysiciansDiagnosis: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? getVisitOptionControlValue(categories.diagnosis.id, patientHasPhysiciansDiagnosis.optPatientHasPhysiciansDiagnosis ,nextProps.visitResult.data.visits):'',
        serum20ml: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? getVisitOptionControlValue(categories.researchBloods.id, serum20mlList.optSerum20ml,nextProps.visitResult.data.visits):'',
        plasma10ml: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? getVisitOptionControlValue(categories.researchBloods.id, plasma10mlList.optPlasma10ml,nextProps.visitResult.data.visits):'',
        pbmc20ml: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? getVisitOptionControlValue(categories.researchBloods.id, pbmc20mlList.optPBMC20ml,nextProps.visitResult.data.visits):'',
        rna5ml: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? getVisitOptionControlValue(categories.researchBloods.id, rna5mlList.optRna5ml,nextProps.visitResult.data.visits):'',
        dna8ml: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? getVisitOptionControlValue(categories.researchBloods.id, dna8mlList.optDNA8ml,nextProps.visitResult.data.visits):'',
        urineStore5ml: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? getVisitOptionControlValue(categories.researchBloods.id, urineStore5mlList.optUrineStore5ml,nextProps.visitResult.data.visits):'',
         
        createdUser: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.createdUser,
        createdDateTime: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.createdDatetime,
        lastUpdatedUser: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.lastUpdatedUser,
        lastUpdatedDateTime: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.lastUpdatedDatetime,
             
                changed:false,
                
        })

      }

    componentDidMount () {
            this.setState({
                patientMeetsAECGCGCA: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientMeetsAECGCriteria.chkPatientMeetsAECGCriteria,this.props.visitResult.data.details):'',            
                patientHasPhysiciansDiagnosis: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getVisitOptionControlValue(categories.diagnosis.id, patientHasPhysiciansDiagnosis.optPatientHasPhysiciansDiagnosis,this.props.visitResult.data.visits):'',

                serum20ml: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getVisitOptionControlValue(categories.researchBloods.id, serum20mlList.optSerum20ml,this.props.visitResult.data.visits):'',
                plasma10ml: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getVisitOptionControlValue(categories.researchBloods.id, plasma10mlList.optPlasma10ml,this.props.visitResult.data.visits):'',
                pbmc20ml: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getVisitOptionControlValue(categories.researchBloods.id, pbmc20mlList.optPBMC20ml,this.props.visitResult.data.visits):'',
                rna5ml: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getVisitOptionControlValue(categories.researchBloods.id, rna5mlList.optRna5ml,this.props.visitResult.data.visits):'',
                dna8ml: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getVisitOptionControlValue(categories.researchBloods.id, dna8mlList.optDNA8ml,this.props.visitResult.data.visits):'',
                urineStore5ml: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getVisitOptionControlValue(categories.researchBloods.id, urineStore5mlList.optUrineStore5ml,this.props.visitResult.data.visits):'',
                 
                createdUser: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.createdUser,
                createdDateTime: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.createdDatetime,
                lastUpdatedUser: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.lastUpdatedUser,
                lastUpdatedDateTime: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.lastUpdatedDatetime,
            
              
              
                changed:false,
            });
       }

      

renderLoadingMessage(){
    return (
        <PanelDefault title={"... Loading Research Bloods"}>
       <div><img src={paths.loader} alt="Download"/></div>
        </PanelDefault>
    )
}
   



 renderAuditData(){

        return (
            <AuditData createdBy={this.state.createdUser} createdDate={this.state.createdDateTime}  lastUpdatedBy={this.state.lastUpdatedUser} lastUpdatedDate={this.state.lastUpdatedDateTime}/>
            
        )
    }




    closeVisitCompleteModal(){
        this.setState({
            visitCompleteModalOpen:false,
        })  
    }
    

openVisitCompleteModal(e){
e.preventDefault();
    this.setState({
        visitCompleteModalOpen:true
    })
}


    afterOpenVisitCompleteModal(){
        var p = ''
        //use this to clear any error
    }

    renderFieldset(){
        
             if (this.props.visitHeaderResult && 
                this.props.visitHeaderResult.data && 
                this.props.visitHeaderResult.data.completed) {
                return (
                <fieldset disabled="disabled">
                    {
                        this.renderResearchBloods()
                    }
                    </fieldset>
                    )
                    }
                    else{
                        return (
                            <fieldset>
                       {
                        this.renderResearchBloods()
                       }
                       </fieldset>
                        )
                    }
        
        
            }


isFormValid(){
return Object.keys(this.state.errors).length === 0  
}



renderExistingHeaderPanel(){
    return (
        <div className='panel panel-primary'>
    <div className="panel-heading">
        <div className="row">
            <div className="col-md-6">
            <h3 className="panel-title pull-left">Research Bloods</h3>
                </div>

          
          
                                      
            </div>
        </div>
       

        <form>
    
{
    this.renderFieldset()
}
</form>


<div className='panel-footer visit-well'>

<div className="col-lg-12 col-md-12 col-sm-12">




<Flow  
token = {
    this.props.visitHeaderResult && 
    this.props.visitHeaderResult.data && 
    this.props.visitHeaderResult.data.token
}

hasParentChanged = {
    this.state.changed
}
isComplete=
{
    this.props.visitHeaderResult && 
    this.props.visitHeaderResult.data && 
    this.props.visitHeaderResult.data.completed
}
sendingRequest= {
    this.props.visitResult.sendingRequest
}
isNew={
    this.props.visitHeaderResult && 
    this.props.visitHeaderResult.data && 
    this.props.visitHeaderResult.data.newVisit 
}
nextCategoryName = {VISIT_CATEGORY_OTHERRESEARCHBIOMATERIALS}
prevCategoryName = {VISIT_CATEGORY_ROUTINEBLOODS}
showNextNav = {true}
showPrevNav = {true}
handleSaveVisitHeader ={this.handleSaveVisitHeader}
openVisitCompleteModal={this.openVisitCompleteModal}
/>
               
                       
               
          
            </div>
             </div>
             </div>
                                    
            
            
            )
}



renderNewHeaderPanel(){
    
    return (
        <div className= "panel panel-primary">
    
        <div className="panel-heading">
                <h3 className="panel-title">Research Bloods</h3>
                
            </div>
           
    
    {
        this.renderFieldset()
    }
    
    
        <div className="panel-footer">
            
                  
                    
<div className="col-lg-12 col-md-12 col-sm-12">
    
    
    

<Flow  
token = {
    this.props.visitHeaderResult && 
    this.props.visitHeaderResult.data && 
    this.props.visitHeaderResult.data.token
}

hasParentChanged = {
    this.state.changed
}
isComplete=
{
    this.props.visitHeaderResult && 
    this.props.visitHeaderResult.data && 
    this.props.visitHeaderResult.data.completed
}
sendingRequest= {
    this.props.visitResult.sendingRequest
}
isNew={
    this.props.visitHeaderResult && 
    this.props.visitHeaderResult.data && 
    this.props.visitHeaderResult.data.newVisit 
}
nextCategoryName = {VISIT_CATEGORY_OTHERRESEARCHBIOMATERIALS}
prevCategoryName = {VISIT_CATEGORY_ROUTINEBLOODS}
showNextNav = {false}
showPrevNav = {false}
handleSaveVisitHeader ={this.handleSaveVisitHeader}
openVisitCompleteModal={this.openVisitCompleteModal}
/>
    
                   
                          
                           
                   
                     </div>
                 </div>
                 </div>
                                        
                
                
                )

    }
    


    renderResearchBloods(){
    
    return (
       
        <div className="panel-body scrollbar-v-visit-content">
            <div className="row">
                <div className="col-md-12"> 
                <div className="page-header"></div>  


                <div className="block block-inclusion-criteria-head no-pad">
                        <div className="block-content-no-border">
                            <div className="form-group row">
                                                        <label htmlFor="attendedUHBpSSClinic" className ="control-label col-lg-4 col-md-2 col-sm-12">Serum</label>
                                                        <label htmlFor="attendedUHBpSSClinic" className ="control-label col-lg-4 col-md-2 col-sm-12">20ml</label>

                                                        <div className="col-lg-4 col-md-8 col-sm-12 funkyradio">
                                                            <div className="funkyradio-success">
                                                                    <input type="Radio" name="serum20ml"  id="optSerum20mlYes"
                                                                    checked={this.state.serum20ml == serum20mlList.optSerum20ml[0].controlValueId}
                                                                    defaultValue={serum20mlList.optSerum20ml[0].controlValueId} 
                                                                    onChange={this.optSerum20ml_onChange}/>
                                                                    <label className="radio-inline" htmlFor="optSerum20mlYes">{serum20mlList.optSerum20ml[0].controlValue}</label>
                                                            </div>
                                                            <div className="funkyradio-danger">
                                                                    <input type="Radio" name="serum20ml" id="optSerum20mlNo" 
                                                                    checked={this.state.serum20ml == serum20mlList.optSerum20ml[1].controlValueId} 
                                                                    defaultValue={serum20mlList.optSerum20ml[1].controlValueId} 
                                                                    onChange={this.optSerum20ml_onChange}/>
                                                                    <label className="radio-inline" htmlFor={"optSerum20mlNo"}>{serum20mlList.optSerum20ml[1].controlValue}</label>
                                                       </div>
                                                        </div>
                                            </div>
                            </div>    
                        <hr className="patient-baseline-inclusion-criteria-hr"/>
                    </div>



               
                    <div className="block block-inclusion-criteria-head no-pad">
                        <div className="block-content-no-border">
                            <div className="form-group row">
                                                        <label htmlFor="attendedUHBpSSClinic" className ="control-label col-lg-4 col-md-2 col-sm-12">Plasma</label>
                                                        <label htmlFor="attendedUHBpSSClinic" className ="control-label col-lg-4 col-md-2 col-sm-12">10ml</label>

                                                        <div className="col-lg-4 col-md-8 col-sm-12 funkyradio">
                                                            <div className="funkyradio-success">
                                                                    <input type="Radio" name="plasma10ml"  id="optPlasma10mlYes"
                                                                    checked={this.state.plasma10ml == plasma10mlList.optPlasma10ml[0].controlValueId}
                                                                    defaultValue={plasma10mlList.optPlasma10ml[0].controlValueId} 
                                                                    onChange={this.optPlasma10ml_onChange}/>
                                                                    <label className="radio-inline" htmlFor="optPlasma10mlYes">{plasma10mlList.optPlasma10ml[0].controlValue}</label>
                                                            </div>
                                                            <div className="funkyradio-danger">
                                                                    <input type="Radio" name="plasma10ml" id="optPlasma10mlNo" 
                                                                    checked={this.state.plasma10ml == plasma10mlList.optPlasma10ml[1].controlValueId} 
                                                                    defaultValue={plasma10mlList.optPlasma10ml[1].controlValueId} 
                                                                    onChange={this.optPlasma10ml_onChange}/>
                                                                    <label className="radio-inline" htmlFor={"optPlasma10mlNo"}>{plasma10mlList.optPlasma10ml[1].controlValue}</label>
                                                       </div>
                                                        </div>
                                            </div>
                            </div>    
                        <hr className="patient-baseline-inclusion-criteria-hr"/>
                    </div>
                        

                    <div className="block block-inclusion-criteria-head no-pad">
                        <div className="block-content-no-border">
                            <div className="form-group row">
                                                        <label htmlFor="attendedUHBpSSClinic" className ="control-label col-lg-4 col-md-2 col-sm-12">PBMC</label>
                                                        <label htmlFor="attendedUHBpSSClinic" className ="control-label col-lg-4 col-md-2 col-sm-12">20ml</label>

                                                        <div className="col-lg-4 col-md-8 col-sm-12 funkyradio">
                                                            <div className="funkyradio-success">
                                                                    <input type="Radio" name="PBMC20ml"  id="optPBMC20mlYes"
                                                                    checked={this.state.pbmc20ml == pbmc20mlList.optPBMC20ml[0].controlValueId}
                                                                    defaultValue={pbmc20mlList.optPBMC20ml[0].controlValueId} 
                                                                    onChange={this.optPBMC20ml_onChange}/>
                                                                    <label className="radio-inline" htmlFor="optPBMC20mlYes">{pbmc20mlList.optPBMC20ml[0].controlValue}</label>
                                                            </div>
                                                            <div className="funkyradio-danger">
                                                                    <input type="Radio" name="PBMC20ml" id="optPBMC20mlNo" 
                                                                    checked={this.state.pbmc20ml == pbmc20mlList.optPBMC20ml[1].controlValueId} 
                                                                    defaultValue={pbmc20mlList.optPBMC20ml[1].controlValueId} 
                                                                    onChange={this.optPBMC20ml_onChange}/>
                                                                    <label className="radio-inline" htmlFor={"optPBMC20mlNo"}>{pbmc20mlList.optPBMC20ml[1].controlValue}</label>
                                                       </div>
                                                        </div>
                                            </div>
                            </div>    
                        <hr className="patient-baseline-inclusion-criteria-hr"/>
                    </div>
                  
                    <div className="block block-inclusion-criteria-head no-pad">
                        <div className="block-content-no-border">
                            <div className="form-group row">
                                                        <label htmlFor="attendedUHBpSSClinic" className ="control-label col-lg-4 col-md-2 col-sm-12">RNA</label>
                                                        <label htmlFor="attendedUHBpSSClinic" className ="control-label col-lg-4 col-md-2 col-sm-12">5ml</label>

                                                        <div className="col-lg-4 col-md-8 col-sm-12 funkyradio">
                                                            <div className="funkyradio-success">
                                                                    <input type="Radio" name="RNA5ml"  id="optRNA5mlYes"
                                                                    checked={this.state.rna5ml == rna5mlList.optRna5ml[0].controlValueId}
                                                                    defaultValue={rna5mlList.optRna5ml[0].controlValueId} 
                                                                    onChange={this.optRNA5ml_onChange}/>
                                                                    <label className="radio-inline" htmlFor="optRNA5mlYes">{rna5mlList.optRna5ml[0].controlValue}</label>
                                                            </div>
                                                            <div className="funkyradio-danger">
                                                                    <input type="Radio" name="RNA5ml" id="optRNA5mlNo" 
                                                                    checked={this.state.rna5ml == rna5mlList.optRna5ml[1].controlValueId} 
                                                                    defaultValue={rna5mlList.optRna5ml[1].controlValueId} 
                                                                    onChange={this.optRNA5ml_onChange}/>
                                                                    <label className="radio-inline" htmlFor={"optRNA5mlNo"}>{rna5mlList.optRna5ml[1].controlValue}</label>
                                                       </div>
                                                        </div>
                                            </div>
                            </div>    
                        <hr className="patient-baseline-inclusion-criteria-hr"/>
                    </div>

                    <div className="block block-inclusion-criteria-head no-pad">
                        <div className="block-content-no-border">
                            <div className="form-group row">
                                                        <label htmlFor="attendedUHBpSSClinic" className ="control-label col-lg-4 col-md-2 col-sm-12">DNA</label>
                                                        <label htmlFor="attendedUHBpSSClinic" className ="control-label col-lg-4 col-md-2 col-sm-12">8ml</label>
                                                        <div className="col-lg-4 col-md-8 col-sm-12 funkyradio">
                                                            <div className="funkyradio-success">
                                                                    <input type="Radio" name="DNA8ml"  id="optDNA8mlYes"
                                                                    checked={this.state.dna8ml == dna8mlList.optDNA8ml[0].controlValueId}
                                                                    defaultValue={dna8mlList.optDNA8ml[0].controlValueId} 
                                                                    onChange={this.optDNA8ml_onChange}/>
                                                                    <label className="radio-inline" htmlFor="optDNA8mlYes">{dna8mlList.optDNA8ml[0].controlValue}</label>
                                                            </div>
                                                            <div className="funkyradio-danger">
                                                                    <input type="Radio" name="DNA8ml" id="optDNA8mlNo" 
                                                                    checked={this.state.dna8ml == dna8mlList.optDNA8ml[1].controlValueId} 
                                                                    defaultValue={dna8mlList.optDNA8ml[1].controlValueId} 
                                                                    onChange={this.optDNA8ml_onChange}/>
                                                                    <label className="radio-inline" htmlFor={"optDNA8mlNo"}>{dna8mlList.optDNA8ml[1].controlValue}</label>
                                                       </div>
                                                        </div>
                                            </div>
                            </div>    
                        <hr className="patient-baseline-inclusion-criteria-hr"/>
                    </div>


                    <div className="block block-inclusion-criteria-head no-pad">
                        <div className="block-content-no-border">
                            <div className="form-group row">
                                                        <label htmlFor="attendedUHBpSSClinic" className ="control-label col-lg-4 col-md-2 col-sm-12">Urine store</label>
                                                        <label htmlFor="attendedUHBpSSClinic" className ="control-label col-lg-4 col-md-2 col-sm-12">5ml</label>

                                                        <div className="col-lg-4 col-md-8 col-sm-12 funkyradio">
                                                            <div className="funkyradio-success">
                                                                    <input type="Radio" name="UrineStore5ml"  id="optUrineStore5mlYes"
                                                                    checked={this.state.urineStore5ml == urineStore5mlList.optUrineStore5ml[0].controlValueId}
                                                                    defaultValue={urineStore5mlList.optUrineStore5ml[0].controlValueId} 
                                                                    onChange={this.optUrineStore5ml_onChange}/>
                                                                    <label className="radio-inline" htmlFor="optUrineStore5mlYes">{urineStore5mlList.optUrineStore5ml[0].controlValue}</label>
                                                            </div>
                                                            <div className="funkyradio-danger">
                                                                    <input type="Radio" name="UrineStore5ml" id="optUrineStore5mlNo" 
                                                                    checked={this.state.urineStore5ml == urineStore5mlList.optUrineStore5ml[1].controlValueId} 
                                                                    defaultValue={urineStore5mlList.optUrineStore5ml[1].controlValueId} 
                                                                    onChange={this.optUrineStore5ml_onChange}/>
                                                                    <label className="radio-inline" htmlFor={"optUrineStore5mlNo"}>{urineStore5mlList.optUrineStore5ml[1].controlValue}</label>
                                                       </div>
                                                        </div>
                                            </div>
                            </div>    
                        <hr className="patient-baseline-inclusion-criteria-hr"/>
                    </div>
                   

                </div>
           </div>
            </div>

         
    )
}
    
render (){
    {
        return(
            <div>
              {
                this.props.visitHeaderResult && 
                this.props.visitHeaderResult.data && 
                !this.props.visitHeaderResult.data.newVisit  ?
                this.renderExistingHeaderPanel():this.renderNewHeaderPanel()
              }

              <OnLeavePrompt changed={this.state.changed &&  
                        this.props.visitHeaderResult && 
                        this.props.visitHeaderResult.data && 
                        !this.props.visitHeaderResult.data.completed }/>


                        <ModalDefault isOpen={this.state.visitCompleteModalOpen}  onRequestClose={this.closeVisitCompleteModal} onAfterOpen={this.afterOpenVisitCompleteModal} style={VISITCOMPLETE} contentLabel={"Complete Visit"}>
        <div  className='panel panel-danger'>
            <div className="panel-heading">
                <button type="button" className="close" onClick={this.closeVisitCompleteModal}><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>                   
                <h4>Complete Visit</h4>
            </div>
            <div className="panel-body">
                 <form className="form" role="form">

                    <div className="alert alert-danger complete-visit-warning-message">
                        <i className="fa fa-exclamation-triangle fa-2 mr-10" aria-hidden="true"></i>
                        Warning: Visit data will no longer be editable</div>

      
                       
                      
                    </form>
            </div>
            <div className="panel-footer">
                <button id="visitCompleteCancel" type="button" className="btn btn-primary mr-3" 
                onClick={this.closeVisitCompleteModal}><i className="fa fa-times" aria-hidden="true"></i>&nbsp;Cancel</button>
                <button id="visitCompleteConfirm"  
                type="button" className="btn btn-danger"
                onClick={this.handleCompleteVisitHeader}>
                <i className="fa fa-floppy-o" aria-hidden="true"></i>&nbsp;Confirm
                </button>
            </div>
        </div>
        </ModalDefault>


        </div>
        );
    }
}
}

 export default ResearchBloodsForm;

