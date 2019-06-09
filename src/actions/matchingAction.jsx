'use strict'

import action from './types/matchingActionType'
import * as firebase from '../firebase/'
import 'firebase/firestore';

export const login = () => {
  return(dispatch) => {
    return firebase.firebaseAuth.signInAnonymously().then(function(user){
      dispatch({type: action.LOGIN.COMPLETE,userID: user.uid});
      })
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("failed to sign in");
        dispatch({type: action.LOGIN.ERROR,msg:error.message});
      });
  }
}


export const fetcheUserData = () =>{
  return (dispatch)=>{
    return new Promise((resolve, reject) => {
      setTimeout(()=>{
        reject("Timeout");
        dispatch({type: action.LOGIN.ERROR});
      },10000);
      firebase.firebaseAuth.onAuthStateChanged(function(user) {
        clearTimeout();
          if (user) {
            dispatch({type: action.LOGIN.COMPLETE,userID: user.uid});
            resolve(user);
          } else {
            dispatch({type: action.LOGIN.ERROR});
            reject();
          }
      });
    });

  }
}
