import * as React from 'react';
import {Link} from '../routes';
import ApplicationLayout from '../hoc/ApplicationLayout';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {connect} from 'react-redux';
import IndexForm from '../forms/indexForm';
import PropTypes from 'prop-types';

class Page extends React.Component {
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
  };

  login = () => {
    this.props.auth.inst.getSession();
  };

  logout = () => {
    this.props.auth.inst.signOut();
    this.props.logout();
  };

  render() {
    const {idToken} = this.props.auth;

    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Title
            </Typography>
          </Toolbar>
        </AppBar>

        {
          idToken ?
            <div>
              <Button variant="outlined" onClick={this.logout}>Sign out</Button>

              <Typography variant="title" gutterBottom>
                  Token
              </Typography>
              {idToken}

              <Typography variant="title" gutterBottom>
                  Token as JSON
              </Typography>
              {this.parseIdToken(idToken)}

              <Typography variant="title" gutterBottom>
                Form
              </Typography>

              <IndexForm
                idToken={idToken}
              />

            </div>
            :
            <div>
              <Button variant="outlined" onClick={this.login}>Sign in</Button>
            </div>
        }

        <div>
          <Typography variant="headline" gutterBottom>
            Links
          </Typography>
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
}


const mapStateToProps = (state) => ({
  auth: state.auth,
});

Page.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

export default ApplicationLayout(connect(mapStateToProps)(Page));
