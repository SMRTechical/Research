import axios from 'axios'
import {handleError} from '../Factory/error-functions';
import {paths} from '../constants/paths/environment';

export const VISIT_CATEGORIES_SUCCESS = 'VISIT_CATEGORIES_SUCCESS'
export const VISIT_CATEGORIES_ASYNC_SUCCESS = 'VISIT_CATEGORIES_ASYNC_SUCCESS'
export const VISIT_CATEGORIES_CLEAR_SUCCESS = 'VISIT_CATEGORIES_CLEAR_SUCCESS'



export function getVisitCategoriesSuccess(visitCategories){
    return{
          type:VISIT_CATEGORIES_SUCCESS,
          payload: visitCategories
      }
  }
  
export function getVisitCategories(visitCategoriesGetParams){
   // console.log('API - getVisitCategories');
    return dispatch => {

        dispatch({type:VISIT_CATEGORIES_ASYNC_SUCCESS});
       // console.log('visitCategoriesGetParams2');
      //  console.log(visitCategoriesGetParams);
         return axios.post(paths.api + '/api/categories', visitCategoriesGetParams)
            .then(function (response) {
                 dispatch(getVisitCategoriesSuccess(response.data))
                 return response.data;
            })
            .catch(function (error) {
                handleError(error);
            });
    }
}

export function visitCategoriesClearSuccess(){
    return{
        type:VISIT_CATEGORIES_CLEAR_SUCCESS,
        payload: null
    }
}

export function visitCategoriesClear(){
    return dispatch => {        
       dispatch(visitCategoriesClearSuccess())
    }
}
