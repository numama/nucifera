import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import configureStore from 'redux-mock-store'
import * as matchingAction from './actions/matchingAction';
import matchingActionType from './actions/types/matchingActionType.jsx';
import thunk from 'redux-thunk';

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

it('test login', async () => {
  const store = mockStore({})
  return store.dispatch(matchingAction.login()).then(() => {
      const actions = store.getActions();
      console.log(actions[0]);
      console.log(actions[1]);
      expect(actions[0]).toEqual({type:matchingActionType.LOGIN.START});
      expect(actions[1]).toEqual({type:matchingActionType.LOGIN.COMPLETE});
  })
});

it('fetch UserData', async () => {
  const store = mockStore({})
  return store.dispatch(matchingAction.fetcheUserData()).then(() => {
      const actions = store.getActions();
      console.log(actions[0]);
      console.log(actions[1]);
      expect(actions[0].type).toEqual(matchingActionType.FETCH_USERDATA.START);
      expect(actions[1].type).toEqual(matchingActionType.FETCH_USERDATA.COMPLETE);
      expect(actions[1].userID).not.toBeNull();
  })
});

it('match random available room not found',async () =>{
  const store = mockStore({})
  return store.dispatch(matchingAction.matchRandomAvailableRoom()).then(() => {
      const actions = store.getActions();
      console.log(actions[0]);
      console.log(actions[1]);
      expect(actions[0].type).toEqual(matchingActionType.MATCH_ROOM.START);
      expect(actions[1].type).toEqual(matchingActionType.MATCH_ROOM.NOT_FOUND);
  })
});

it('create room and rematch',async ()=>{
  const store = mockStore({})
  return store.dispatch(matchingAction.createNewRoom()).then(() => {
      const actions = store.getActions();
      console.log(actions[0]);
      console.log(actions[1]);
      expect(actions[0].type).toEqual(matchingActionType.CREATE_ROOM.START);
      expect(actions[1].type).toEqual(matchingActionType.CREATE_ROOM.COMPLETE);
      expect(actions[1].roomId).not.toBeNull();
      expect(actions[1].roomData).not.toBeNull();
  })
});

it('rematch random available room found',async () =>{
  const store = mockStore({})
  return store.dispatch(matchingAction.matchRandomAvailableRoom()).then(() => {
      const actions = store.getActions();
      console.log(actions[0]);
      console.log(actions[1]);
      expect(actions[0].type).toEqual(matchingActionType.MATCH_ROOM.START);
      expect(actions[1].type).toEqual(matchingActionType.MATCH_ROOM.FOUND);
      expect(actions[1].roomId).not.toBeNull();
      expect(actions[1].roomData).not.toBeNull();
  })
});


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
