import {applyMiddleware, createStore} from 'redux';
import reducers from './reducers';
import ReduxThunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';


export const makeStore = (initialState, options) => createStore(reducers,
  initialState,
  composeWithDevTools(
    applyMiddleware(ReduxThunk)
  )
);
