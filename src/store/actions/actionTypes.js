import axios from '../../axios-apps';

export const ADD_APP_START = 'ADD_APP_START';
export const ADD_APP_SUCCESS = 'ADD_APP_SUCCESS';
export const ADD_APP_FAIL = 'ADD_APP_FAIL';

export const EDIT_APP_START = 'EDIT_APP_START';
export const EDIT_APP_SUCCESS = 'EDIT_APP_SUCCESS';
export const EDIT_APP_FAIL = 'EDIT_APP_FAIL';

export const FETCH_APPS_START = 'FETCH_APPS_START';
export const FETCH_APPS_SUCCESS = 'FETCH_APPS_SUCCESS';
export const FETCH_APPS_FAIL = 'FETCH_APPS_FAIL';

export const USER_INPUT = 'USER_INPUT';
export const DATE_CHANGE = 'DATE_CHANGE';
export const SUBMIT_APP = "SUBMIT_APP";
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const SET_APPS = 'SET_APPS';

export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';
export const LOGOUT = 'LOGOUT';


export const addAppStart = () => {
  return {
    type: ADD_APP_START
  }
}
export const addAppFail = (error) => {
  return {
    type: ADD_APP_FAIL,
    error: error
  }
}
export const addAppSuccess = (id, appData) => {
  return {
    type: ADD_APP_SUCCESS,
    appId: id,
    appData: appData
  }
}
export const addApp = (appData, token) => {
  return dispatch => {
    dispatch(addAppStart());
    axios.post('/applications.json?auth=' + token, appData)
      .then(response => {
        dispatch(addAppSuccess(response.data.name, appData))
      })
      .catch (error => {
        dispatch(addAppFail(error));
      })
  }
}
export const editAppStart = () => {
  return {
    type: EDIT_APP_START
  }
}
export const editAppFail = (error) => {
  return {
    type: EDIT_APP_FAIL,
    error: error
  }
}
export const editAppSuccess = (responseData) => {
  return {
    type: EDIT_APP_SUCCESS,
    responseData: responseData
  }
}
export const editApp = (responseData, id, token) => {
  return dispatch => {
    dispatch(editAppStart());
    axios.patch(`https://job-search-app-73b30.firebaseio.com/applications/${id}/application.json?auth=${token}`, responseData)
      .then(response => {
        dispatch(editAppSuccess(responseData))
      })
      .catch(error => {
        console.log(error)
        dispatch(editAppFail(error))
      })
  }
}

export const userInput = (e) => {
  return {
    type: USER_INPUT,
    ev: e
  }
}

export const dateChange = (date) => {
  return {
    type: DATE_CHANGE,
    date: date
  }
}

export const submitApp = (e) => {
  return {
    type: SUBMIT_APP,
    ev: e
  }
}

export const closeModal = () => {
  return {
    type: CLOSE_MODAL
  }
}

export const fetchAppsStart = () => {
  return {
    type: FETCH_APPS_START
  }
}
export const fetchAppsFail = (error) => {
  return {
    type: FETCH_APPS_FAIL,
    error: error
  }
}

export const fetchAppsSuccess = (apps) => {
  return {
    type: FETCH_APPS_SUCCESS,
    apps: apps
  }
}

export const fetchApps = (token, userId) => {
  return dispatch => {
    dispatch(fetchAppsStart());
    const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios.get('/applications.json' + queryParams)
      .then(response => {
        const fetchedApps = [];
        for (let key in response.data) {
          fetchedApps.push({
            ...response.data[key],
            id: key
          } );
        }
        dispatch(fetchAppsSuccess(fetchedApps))
      } )
      .catch( error => {
        dispatch(fetchAppsFail(error.response.data))
      })
  }
}

export const authStart = () => {
  return {
    type: AUTH_START
  }
}

export const authSuccess = (token, userId) => {
  return {
    type: AUTH_SUCCESS,
    idToken: token,
    userId: userId
  }
}

export const authFail = (error) => {
  return {
    type: AUTH_FAIL,
    error: error
  }
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('expireTime')
  localStorage.removeItem('userId')
  return {
    type: LOGOUT
  }
}

export const checkAuthTime = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
        dispatch(logout());
    }, expirationTime * 1000);
  }
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expireTime'));
      if (expirationDate > new Date()) {
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTime((expirationDate.getTime() - new Date().getTime()) / 1000 ));
      } else {
        dispatch(logout());
      }
    }
  }
}

export const auth = (email , password, isSignUp) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAHzj-sXG-TCA39uZ0hXVcWbFFvalWzyX8'
    if (!isSignUp) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAHzj-sXG-TCA39uZ0hXVcWbFFvalWzyX8'
    }
    axios.post(url, authData)
      .then(response => {
        const expireTime = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        localStorage.setItem('token', response.data.idToken)
        localStorage.setItem('expireTime', expireTime)
        localStorage.setItem('userId', response.data.localId)
        dispatch(authSuccess(response.data.idToken, response.data.localId))
        dispatch(checkAuthTime(response.data.expiresIn))
      })
      .catch(error => {
        console.log(error.response.data.error.message);
        dispatch(authFail(error.response.data.error))
      })
  }
}