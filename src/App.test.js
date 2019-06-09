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
      expect(actions[0].type).toEqual(matchingActionType.LOGIN.COMPLETE);
      expect(actions[0].userID).not.toBeNull();
  })
});



it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
