'use strict'

import action from './types/matchingActionType'
import config from '../config/matchRoomConfig'
import {firebaseDb,firebaseAuth} from '../firebase/'
import firebase from 'firebase';
import 'firebase/firestore';

export const login = () => {
  return(dispatch) => {
    dispatch({type: action.LOGIN.START});
    return firebaseAuth.signInAnonymously().then(function(){
      dispatch({type: action.LOGIN.COMPLETE});
      })
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        dispatch({type: action.LOGIN.ERROR,msg:error.message});
      });
  }
}


export const fetcheUserData = () =>{
  return (dispatch)=>{
    return new Promise((resolve, reject) => {
      dispatch({type: action.FETCH_USERDATA.START});
      setTimeout(()=>{
        reject("Timeout");
        dispatch({type: action.FETCH_USERDATA.ERROR});
      },config.FETCH_USERDATA_TIMEOUT_SEC*1000);

      firebaseAuth.onAuthStateChanged(function(user) {
        clearTimeout();
          if (user) {
            dispatch({type: action.FETCH_USERDATA.COMPLETE,userID: user.uid});
            resolve();
          } else {
            dispatch({type: action.FETCH_USERDATA.ERROR});
            reject();
          }
      });

    });

  }
}

export const matchRandomAvailableRoom = () => {
  return (dispatch)=>{
    const timeout = new Date();
    timeout.setMinutes(timeout.getMinutes() - config.ROOM_UPDATE_TIMEOUT_MIN);

    const query = firebaseDb.collection("rooms")
      .where("available", "==", true)
      .where("update_time",">",timeout)
      .orderBy("update_time", "desc").limit(1);

    dispatch({type: action.MATCH_ROOM.START});

    return query.get().then((querySnapshot)=>{
      if (querySnapshot.docs.length > 0) {
        dispatch({type: action.MATCH_ROOM.FOUND,roomId:querySnapshot.docs[0].id,roomData: querySnapshot.docs[0].data()});
      } else {
        dispatch({type: action.MATCH_ROOM.NOT_FOUND});
      }
    }).catch((err)=>{
      dispatch({type: action.MATCH_ROOM.ERROR,msg:err});
    });

  }
}

export const createNewRoom = () =>{
  return (dispatch)=>{
    let newRoom = {
      available:true,
      update_time:firebase.firestore.FieldValue.serverTimestamp()
    }
    dispatch({type: action.CREATE_ROOM.START});
    return firebaseDb.collection("rooms").add(newRoom).then((doc)=>{
      dispatch({
        type: action.CREATE_ROOM.COMPLETE,
        roomId:doc.id,
        roomData: newRoom});
    }).catch((err)=>{
      dispatch({type: action.CREATE_ROOM.ERROR,msg:err});
    });
  }
}
