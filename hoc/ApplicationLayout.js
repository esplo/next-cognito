import * as React from 'react';
import {CognitoAuth} from 'amazon-cognito-auth-js/dist/amazon-cognito-auth';
import {COGNITO_ID_TOKEN_COOKIE_NAME, cognitoAuthData} from '../credentials/cognito';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import fetchFromCookie from '../util/fetchFromCookie';
import {actions as authActions} from '../store/reducers/auth';

import getMuiThemeWithUA from '../util/getMuiThemeWithUA';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';

// Make sure react-tap-event-plugin only gets injected once
// Needed for material-ui
if (!process.tapEventInjected) {
  injectTapEventPlugin();
  process.tapEventInjected = true;
}


const Layout = (Page) => {
  return class extends React.Component {
    static async getInitialProps(ctx) {
      const {req} = ctx;
      const childProps = Page.getInitialProps ? Page.getInitialProps(ctx) : {};
      const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;

      const props = Object.assign({}, childProps, {userAgent});

      // pick token from cookie
      const cookies = await fetchFromCookie(req);
      const token = cookies(COGNITO_ID_TOKEN_COOKIE_NAME);
      if (token) {
        ctx.store.dispatch(authActions.login(token));
      }

      return props;
    }

    componentDidMount() {
      const redirectUrl = window.location.href;
      const authInst = new CognitoAuth(cognitoAuthData(redirectUrl));

      authInst.userhandler = {
        onSuccess: (result) => {
          const token = result.idToken.jwtToken;
          this.props.login(token);
        },
        onFailure: function(err) {
          alert('Error!');
        },
      };

      // TODO: enable this when the bug in SDK is fixed
      // auth.useCodeGrantFlow();
      authInst.parseCognitoWebResponse(window.location.href);

      // check whether this user was already signed in
      // to prevent opening sign-in window suddenly when the user is not signed in
      if (authInst.getCachedSession().isValid()) {
        authInst.getSession();
      }

      // sign-in check was done
      this.props.setSigningIn(false);
      this.props.setAuthInst(authInst);
    }

    render() {
      const muiTheme = getMuiThemeWithUA(this.props.userAgent);
      return <div>
        <MuiThemeProvider muiTheme={muiTheme}>
        {
          this.props.auth.signingIn ?
            <div>loading...</div> :
            <Page {...this.props}/>
        }
        </MuiThemeProvider>
      </div>;
    }
  };
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({...authActions}, dispatch);
};

export default (Page) => connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout(Page));
