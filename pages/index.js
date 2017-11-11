import React from 'react';
import {Link} from '../routes';
import ApplicationLayout from '../hoc/ApplicationLayout';
import AppBar from 'material-ui/AppBar';

import {connect} from 'react-redux';
import {COGNITO_ID_TOKEN_COOKIE_NAME} from '../credentials/cognito';
import fetchFromCookie from '../util/fetchFromCookie';

import IndexForm from '../forms/indexForm';

const Page = class extends React.Component {
  static async getInitialProps({req}) {
    return {};
  }

  parseIdToken = (idToken) => {
    if (idToken) {
      const payload = idToken.split('.')[1];
      const ascii = (new Buffer(payload, 'base64')).toString('ascii');
      return JSON.stringify(ascii, null, 4);
    }
    return {};
  }

  login = () => {
    this.props.auth.inst.getSession();
  }

  logout = () => {
    this.props.auth.inst.signOut();
    this.props.logout();
  }

  render() {
    const {idToken} = this.props.auth;

    return (
      <div>
        <AppBar
          title="Title"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />

        {
          idToken ?
            <div>
              Logout Link
              <div>token: {idToken}</div>
              <div>{this.parseIdToken(idToken)}</div>

              <button onClick={this.logout}>Sign out</button>

              <IndexForm
                idToken={idToken}
              />
            </div>
            :
            <div>
              <button onClick={this.login}>Sign in</button>
            </div>
        }

        <div>
          <div>
            <Link route='/blog/hello-world'>
              <a>Hello world</a>
            </Link>
            <span> / </span>
            <Link href="/ghpage">
              <a>to ghpage</a>
            </Link>
          </div>
        </div>
      </div>
    );
  }
};


const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default ApplicationLayout(connect(mapStateToProps)(Page));
