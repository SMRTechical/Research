import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Prompt,NavLink} from 'react-router-dom'
import classnames from 'classnames'

import {paths} from '../../../constants/paths/environment';

import {categories} from '../../../config/categories';
import FadeIn from '../../../components/animation/fade-in';
import {AECGC} from '../../../constants/styles/input';
import ReactTooltip from 'react-tooltip';
import {Spinner} from 'belle';
import OnLeavePrompt from '../../../components/generic/on-leave-prompt';

import 
{
    VISIT_CATEGORY_AMERICANEUROPEANCGC,
    VISIT_CATEGORY_DIAGNOSIS,
    VISIT_CATEGORY_CURRENTMEDICATIONS,
    VISIT_CATEGORY_ESSPRI,
    VISIT_CATEGORY_ESSDAI,
    VISIT_CATEGORY_ACTIVITYSCORE,
    VISIT_CATEGORY_DAMAGEINDICES,
    VISIT_CATEGORY_PASTMEDICALHISTORY,
    VISIT_CATEGORY_INVESTIGATIONSREQUESTED,
    VISIT_CATEGORY_ULTRASOUNDRESULTS,
    VISIT_CATEGORY_SALIVARYFLOW,
    VISIT_CATEGORY_ROUTINEBLOODS,
    VISIT_CATEGORY_RESEARCHBLOODS,
    VISIT_CATEGORY_OTHERRESEARCHBIOMATERIALS,
    VISIT_CATEGORY_CLINICALORALDRYNESSSCORE,
    VISIT_CATEGORY_OCULARSURFACESTAININGSCORE,
    VISIT_CATEGORY_FATFREEMASS

} from '../../../constants/paths/visit-category-names';

class Flow extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          hasParentChanged: false,
          isComplete : false,
          sendingRequest: false,
          isNew:true,
          showNextNav :false,
          showPrevNav: false,
          nextCategoryName:null,
          prevCategoryName:null,
          token: null
        };


        this.renderLoadingMessage = this.renderLoadingMessage.bind(this);
        this.renderSaveButton = this.renderSaveButton.bind(this);
        this.renderSavingButton = this.renderSavingButton.bind(this);
        this.renderCompleteButton = this.renderCompleteButton.bind(this);
        this.renderCompletingButton = this.renderCompletingButton.bind(this);
        this.renderCompletedButton = this.renderCompletedButton.bind(this);
        this.renderNavigation = this.renderNavigation.bind(this);

        this.renderSaveSection = this.renderSaveSection.bind(this);
        this.renderCompleteSection = this.renderCompleteSection.bind(this);
        this.renderCompletedSection = this.renderCompletedSection.bind(this);

        this.renderPrevSection = this.renderPrevSection.bind(this);
        this.renderNextSection = this.renderNextSection.bind(this);

        this.renderNextButton = this.renderNextButton.bind(this);
        this.renderPrevButton = this.renderPrevButton.bind(this);
        this.getCategoryPath = this.getCategoryPath.bind(this)


    }

    





    componentWillReceiveProps(nextProps){
       // console.log('Flow recieved props')
       this.setState({
        hasParentChanged: nextProps.hasParentChanged,
        isComplete : nextProps.isComplete,
        sendingRequest: nextProps.sendingRequest,
        isNew:nextProps.isNew,
        showNextNav :nextProps.showNextNav,
        showPrevNav: nextProps.showPrevNav,
        nextCategoryName:nextProps.nextCategoryName,
        prevCategoryName:nextProps.prevCategoryName,
        token: nextProps.token
       })
     
      }

    componentDidMount () {
      //  console.log('Flow mounted')
        this.setState({
            hasParentChanged: this.props.hasParentChanged,
            isComplete : this.props.isComplete,
            sendingRequest: this.props.sendingRequest,
            isNew:this.props.isNew,
            showNextNav :this.props.showNextNav,
            showPrevNav: this.props.showPrevNav,
            nextCategoryName:this.props.nextCategoryName,
            prevCategoryName:this.props.prevCategoryName,
            token:this.props.token         
           })
       }

      

renderLoadingMessage(){
    return (

    <div> Loading...   <Spinner characterStyle={{ color: '#FFFFFF' }}/>    
    </div>
)
}
   





renderSaveSection(){
     if (!this.state.isComplete){
             if (!this.state.sendingRequest){
                     return this.renderSaveButton()
             }
             else {
                     return  this.renderSavingButton()
             }
                 }
                 else {
                     return null
                 }
 }

renderSaveButton() {
return (
    <button 
    type="submit" 
    name="patientBaseline-save-btn"  
    onClick={this.props.handleSaveVisitHeader}
    id="patient-baseline-btn"
    className="btn btn-success btn-nav pull-right">
        <i className="fa fa-floppy-o mr-5" aria-hidden="true"></i><span>Save</span>
</button>
)
}


renderSavingButton(){
 return (
 <button 
    type="submit" 
    name="patientBaseline-save-btn"  
    id="patient-baseline-btn"
    disabled
    className="btn btn-success btn-nav pull-right">
        <span>Saving</span>
        <Spinner characterStyle={{ color: '#FFFFFF' }}/>
</button>
 )
}




renderCompleteSection(){
  
    if (!this.state.isComplete && !this.state.isNew){
            if (!this.state.sendingRequest){
                return this.renderCompleteButton()
            }
            else {
                    return  this.renderCompletingButton()
            }
      }
        else {
                    return null
                }
}



renderCompletedSection(){
    
      if (this.state.isComplete && !this.state.isNew){
            return this.renderCompletedButton()  
        }
          else {
                      return null
                  }
  }

renderCompleteButton() {
    return (


        <button 
        type="submit" 
        name="patient-visit-complete-btn"  
        onClick={this.props.openVisitCompleteModal}
        id="patient-visit-complete-btn"
        className="btn btn-primary btn-nav pull-right mr-10">
            <i className="fa fa-thumbs-up mr-5" aria-hidden="true"></i><span>Complete Visit</span>
    </button>
        
   
    )
    }
    

    renderCompletedButton() {
        return (
    
    

        <div className="btn-div btn-div-primary btn-nav pull-right mr-10">
             <i className="fa fa-check mr-5" aria-hidden="true"></i><span>Visit Complete</span>
            </div>
            
       
        )
        }

    
    renderCompletingButton(){
     return (
       
<button 
    type="submit" 
    name="patient-visit-completing-btn"  
    id="patient-visit-completing-btn"
    disabled
    className="btn btn-primary btn-nav pull-right mr-10">
        <span>Completing Visit</span>
        <Spinner characterStyle={{ color: '#FFFFFF' }}/>
</button>

   
     )
    }

    getCategoryPath(categoryName){
       if (!!this.state.token){
        var path = paths.visitLink  + this.props.token + '/'  ;        
            switch (categoryName) {
                case VISIT_CATEGORY_AMERICANEUROPEANCGC :
                    return path + VISIT_CATEGORY_AMERICANEUROPEANCGC;
                case VISIT_CATEGORY_DIAGNOSIS:
                    return path + VISIT_CATEGORY_DIAGNOSIS ;
                case VISIT_CATEGORY_CURRENTMEDICATIONS:
                    return path + VISIT_CATEGORY_CURRENTMEDICATIONS;
                    case VISIT_CATEGORY_ESSPRI:
                        return path + VISIT_CATEGORY_ESSPRI;
                case VISIT_CATEGORY_ESSDAI:
                    return path + VISIT_CATEGORY_ESSDAI ;
                case VISIT_CATEGORY_ACTIVITYSCORE:
                    return path + VISIT_CATEGORY_ACTIVITYSCORE;
                case VISIT_CATEGORY_DAMAGEINDICES:
                    return path + VISIT_CATEGORY_DAMAGEINDICES;
                case VISIT_CATEGORY_PASTMEDICALHISTORY:
                    return path + VISIT_CATEGORY_PASTMEDICALHISTORY;
                case VISIT_CATEGORY_INVESTIGATIONSREQUESTED:
                    return path + VISIT_CATEGORY_INVESTIGATIONSREQUESTED;
                case VISIT_CATEGORY_ULTRASOUNDRESULTS:
                    return path + VISIT_CATEGORY_ULTRASOUNDRESULTS ;
                case VISIT_CATEGORY_SALIVARYFLOW:
                    return path + VISIT_CATEGORY_SALIVARYFLOW;
                case VISIT_CATEGORY_ROUTINEBLOODS:
                    return path + VISIT_CATEGORY_ROUTINEBLOODS;
                case VISIT_CATEGORY_RESEARCHBLOODS:
                    return path + VISIT_CATEGORY_RESEARCHBLOODS;
                case VISIT_CATEGORY_OTHERRESEARCHBIOMATERIALS:
                    return path + VISIT_CATEGORY_OTHERRESEARCHBIOMATERIALS;
                case VISIT_CATEGORY_CLINICALORALDRYNESSSCORE:
                    return path + VISIT_CATEGORY_CLINICALORALDRYNESSSCORE;
                case VISIT_CATEGORY_OCULARSURFACESTAININGSCORE:
                    return path + VISIT_CATEGORY_OCULARSURFACESTAININGSCORE;
                case VISIT_CATEGORY_FATFREEMASS:
                    return path + VISIT_CATEGORY_FATFREEMASS;
            }
        }
    }



    renderNextSection(){
// console.log('this.state.showNextNav')
// console.log(this.state.showNextNav)
// console.log('this.state.nextCategoryName')
// console.log(this.state.nextCategoryName)
// console.log('this.state.token')
// console.log(this.state.token)
        if (this.state.showNextNav && 
            !!this.state.nextCategoryName &&
            !!this.state.token){
               


    return this.renderNextButton(this.getCategoryPath(this.state.nextCategoryName))

       
                
            }
            else {
                return null
            }
               
  
    }


renderNextButton(path){
    return (
            <NavLink 
            
            className= 'btn btn-success btn-nav mr-10 pull-right nav-visit-button'            
            activeClassName="active" to={path} aria-hidden="true">
                <span className="mr-5">Next</span><i className="fa fa fa-angle-right" aria-hidden="true"></i>
            </NavLink>
    )
}



renderPrevSection(){
 
    if (this.state.showPrevNav && 
        !!this.state.prevCategoryName &&
        !!this.state.token){    
            return this.renderPrevButton(this.getCategoryPath(this.state.prevCategoryName))
            }
        else {
            return null
        }
   }

renderPrevButton(path){
    return (
        


        <NavLink 
        className='btn btn-success btn-nav mr-10 pull-right nav-visit-button'        
        activeClassName="active" to={path} aria-hidden="true">
            <i className="fa fa-angle-left mr-5" aria-hidden="true"></i><span>Previous</span>
        </NavLink>
    )
}

renderNavigation(){
    //console.log('renderNavigation')
    return (
   

<div className="col-lg-12 col-md-12 col-sm-12">

               
                       {  
                        this.props.configResult.data && this.props.configResult.data.userInfo && 
                        (this.props.configResult.data.userInfo.userRole === "Update" || this.props.configResult.data.userInfo.userRole === "Administrator") ?                      
                          this.renderSaveSection():null
                                      }
                                    

                                    { 
                                        this.props.configResult.data && this.props.configResult.data.userInfo && this.props.configResult.data.userInfo.userRole === "Administrator" ?
                                    this.renderCompleteSection():null  
                                      }

{
    this.props.configResult.data && this.props.configResult.data.userInfo && this.props.configResult.data.userInfo.userRole === "Administrator" ?
    this.renderCompletedSection():null
} 


                                      {
    this.renderNextSection()
}
{
    this.renderPrevSection()
}

    
               
  <OnLeavePrompt changed={this.state.hasParentChanged &&  
                            !this.state.isComplete }/>
                 </div>
                    
            
            
            )
}



    render (){
        
            return(
                <div>
                   
                 {
                    this.renderNavigation()
                 }

                


                            


            </div>
            );
        
}
}

// export default Flow;



function mapStateToProps(state) {
    return {
        configResult : state.configResult
    };
}



 export default connect(mapStateToProps,null,null, {
    pure: false
  })(Flow);

