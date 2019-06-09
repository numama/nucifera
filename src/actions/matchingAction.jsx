'use strict'

import action from './types/matchingActionType'
import * as firebase from '../firebase/'
import 'firebase/firestore';

export const login = () => {
  return(dispatch) => {
    /*firebase.firebaseAuth.onAuthStateChanged(function(user) {
      if (user) {
        dispatch({type: action.LOGIN.COMPLETE,userID: user.uid})
      } else {
        dispatch({type: action.LOGIN.ERROR})
      }
    });*/
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


export const loginCheck = () =>{
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

() => {
  var provider = twitterProvider;
  firebase.firebaseAuth.signInWithRedirect(provider);
  firebase.auth().signInAnonymously().catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
  return {type: action.LOGIN}
}
