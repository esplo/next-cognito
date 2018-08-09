import * as React from 'react';
import {Field, reduxForm, submit} from 'redux-form';
import {RadioButton} from 'material-ui/RadioButton';
import {DatePicker, RadioButtonGroup, TextField} from 'redux-form-material-ui';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import moment from 'moment';
import PropTypes from 'prop-types';

const validate = (values) => {
  const errors = {};

  if (!values.username) {
    errors.username = 'Required';
  } else if (values.username.length < 2) {
    errors.username = 'Must be more than 1 character';
  } else if (values.username.length > 15) {
    errors.username = 'Must be 15 characters or less';
  }

  if (!values.birthday) {
    errors.birthday = 'Required';
  } else {
    const birthday = moment(values.birthday);
    if (moment().diff(birthday, 'years') < 20) {
      errors.birthday = 'Sorry, you must be at least 20 years old';
    }
  }

  return errors;
};

const warn = (values) => {
  const warnings = {};
  if (values.language === 'cpp') {
    warnings.language = 'really?';
  }
  return warnings;
};

const submitProcess = (values, dispatch, props) => {
  // TODO: replace this dummy submit
  alert(JSON.stringify(values) + ` idToken: ${props.idToken.substr(0, 10)}...`);
};

const RemoteSubmitButton = (props) => {
  const {dispatch, submitting, invalid} = props;

  return <RaisedButton label="Submit"
    type="button"
    onClick={() => dispatch(submit('syncValidation'))}
    disabled={submitting || invalid}
  />;
};

RemoteSubmitButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
};

const SubmitButton = connect((state) => state)(RemoteSubmitButton);

const withError = ({meta, props}) => (
  <div>
    <span {...props} className='error'>Error : {meta.error}</span><br />
    <span {...props} className='warn'>Warn: {meta.warning}</span>
  </div>
);

withError.propTypes = {
  meta: PropTypes.object.isRequired,
  props: PropTypes.object.isRequired,
};

const birthdayWithError = ({input, meta, ...props}) => {
  return <div>
    <Field name="birthday" component={DatePicker}
      format={(value, name) => value || null}
      floatingLabelText="birthday"
      error="sss"
    />
    {withError({meta, props})}
  </div>;
};

birthdayWithError.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  props: PropTypes.object,
};

const languageWithError = ({input, meta, ...props}) => {
  return <div>
    <Field name="language" component={RadioButtonGroup}>
      <RadioButton value="cpp" label="C++"/>
      <RadioButton value="scala" label="Scala"/>
      <RadioButton value="haskell" label="Haskell"/>
    </Field>
    {withError({meta, props})}
  </div>;
};

languageWithError.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  props: PropTypes.object,
};

const SyncValidationForm = (props) => {
  const {pristine, reset, submitting, error, invalid} = props;

  return (
    <form>
      <div>
        <Field name="username" type="text" component={TextField} hintText="esplo" floatingLabelText="username"/>
      </div>

      <div>
        <Field name="birthday" component={birthdayWithError}/>
      </div>

      <div>
        <Field name="language" component={languageWithError} />
      </div>

      {error && <strong>{error}</strong>}

      <div>
        <SubmitButton submitting={submitting} invalid={invalid}/>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
      </div>
    </form>
  );
};

SyncValidationForm.propTypes = {
  pristine: PropTypes.bool,
  reset: PropTypes.func,
  submitting: PropTypes.bool,
  error: PropTypes.string,
  invalid: PropTypes.bool,
};

const rf = reduxForm({
  form: 'syncValidation',
  validate,
  warn,
  onSubmit: submitProcess,
})(SyncValidationForm);

export default rf;
