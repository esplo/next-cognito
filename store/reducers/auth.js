import {createActions, handleActions} from 'redux-actions';
import {COGNITO_ID_TOKEN_COOKIE_NAME} from '../../credentials/cognito';

import Cookie from 'js-cookie';

const defaultState = {
  inst: null,
  signingIn: true,
  idToken: null,
};

export const actions = createActions({
  SET_AUTH_INST: (inst) => ({inst}),
  SET_SIGNING_IN: (signingIn) => ({signingIn}),
  LOGIN: (idToken) => ({idToken}),
  LOGOUT: () => {},
});

const reducer = handleActions({
  [actions.setAuthInst](state, {payload: {inst}}) {
    return {...state, inst};
  },
  [actions.setSigningIn](state, {payload: {signingIn}}) {
    return {...state, signingIn};
  },
  [actions.login](state, {payload: {idToken}}) {
    // set into cookie for SSR
    // TODO: exact expiration time
    Cookie.set(
      COGNITO_ID_TOKEN_COOKIE_NAME,
      idToken,
      {secure: true, expires: 1/48}
    );
    return {...state, idToken, signingIn: false};
  },
  [actions.logout](state) {
    Cookie.remove(COGNITO_ID_TOKEN_COOKIE_NAME);
    return {...state, idToken: null};
  },
}, defaultState);

export default reducer;
