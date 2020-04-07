import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../utility';

const initialState = {
  companyName: '',
  jobTitle: '',
  location: '',
  postURL: '',
  usefulInfo: '',
  startDate: new Date(),
  applications: [],
  submitting: false,
  loading: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_INPUT:
      action.ev.persist();
      return {
        ...state,
        [action.ev.target.name]: action.ev.target.value
      }
    case actionTypes.ADD_APP_START:
      return updateObject(state, {loading: true, submitting: false})

    case actionTypes.ADD_APP_SUCCESS:
      const newApp = updateObject(action.appData, {id: action.appId})

      return updateObject(state, {
        companyName: '',
        jobTitle: '',
        location: '',
        postURL: '',
        usefulInfo: '',
        startDate: new Date(),
        loading: false,
        applications: state.applications.concat(newApp)
      })

    case actionTypes.ADD_APP_FAIL:
      return updateObject(state, {loading: false})

    case actionTypes.EDIT_APP_START:
      return updateObject(state, {loading: true})   
    
    case actionTypes.EDIT_APP_FAIL:
      return updateObject(state, {loading: false, error: action.error})
    
    case actionTypes.EDIT_APP_SUCCESS:
      return updateObject(state, {
        responseData: action.responseData,
        loading: false,
        error: null
      })
    case actionTypes.DATE_CHANGE:
      return {
        ...state,
        startDate: action.date,
        applications: state.applications
      }
    case actionTypes.SUBMIT_APP:
      action.ev.preventDefault();
      action.ev.persist();
      // Check if form has been completed updated
      if(!(state.companyName.length == 0 || state.jobTitle == 0 || state.location == 0)) {
        return {
          ...state,
          submitting: true
        }
      } else {
          alert('Please fill out the whole form!') 
      }
      break;
    case actionTypes.CLOSE_MODAL:
      return {
        ...state,
        submitting: false
      }
    case actionTypes.FETCH_APPS_START:
      return updateObject(state, {loading: true})
    
      case actionTypes.FETCH_APPS_SUCCESS:
      return updateObject( state, {
        applications: action.apps,
        loading: false,
        error: null
      })
    case actionTypes.FETCH_APPS_FAIL:
      return updateObject(state, {loading: false, error: action.error})
  }
  return state;
}

export default reducer;