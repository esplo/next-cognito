const settings = {
  REGION: 'ap-northeast-1',
  IDENTITY_POOL_ID: 'ap-northeast-1:111111-11111-11111-111-1111111',
  USER_POOL_ID: 'ap-northeast-1_111111111',
  CLIENT_ID: '1111111111111111111',

  COGNITO_HOSTING_DOMAIN: 'xxxxxxxxxxxx.auth.ap-northeast-1.amazoncognito.com',
  COGNITO_LOGIN_REDIRECT_SIGNIN_URL: 'https://xxxxxxxxxx/',
  COGNITO_LOGIN_REDIRECT_SIGNOUT_URL: 'https://xxxxxxxxxx/',
  TOKEN_SCOPES: ['email', 'openid', 'profile', 'aws.cognito.signin.user.admin'],
};

export const cognitoAuthData = (redirectUrl) => ({
  ClientId: settings.CLIENT_ID,
  AppWebDomain: settings.COGNITO_HOSTING_DOMAIN,
  TokenScopesArray: settings.TOKEN_SCOPES,
  RedirectUriSignIn: redirectUrl,
  RedirectUriSignOut: redirectUrl,
});

export const COGNITO_ID_TOKEN_COOKIE_NAME = 'cognito-id-token';
