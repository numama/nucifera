import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import configureStore from 'redux-mock-store'
import * as matchingAction from './actions/matchingAction';
import matchingActionType from './actions/types/matchingActionType.jsx';
import thunk from 'redux-thunk';

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

it('test Login', async () => {
  const store = mockStore({})
  return store.dispatch(matchingAction.login()).then(() => {
      const actions = store.getActions();
      console.log(actions[0]);
      expect(actions[0]).toEqual({type:matchingActionType.LOGIN.COMPLETE})
  })
});

it('test Login Check', async () => {
  const store = mockStore({})
  return store.dispatch(matchingAction.loginCheck()).then(() => {
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
