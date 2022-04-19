export default {
    // https://manage.auth0.com/dashboard/us/dev-neex6mmz/applications/NxDLKox3ItnE6JEFpuOcnVDY6a3pJYu0/settings
    // https://login.okta.com/
    // https://developer.okta.com/

    oidc: {
        clientId:       'NxDLKox3ItnE6JEFpuOcnVDY6a3pJYu0',
        issuer:         'https://dev-neex6mmz.us.auth0.com/oauth2/default',        
        redirectUri:    'http://localhost:4200/login/callback',
        // Scopes provide access to information about user
        scopes:         [
            'openid',
            // openid: required for authentication requests
            'profile',
            // profile: user's first name, last name, phone etc
            'email'
            // email: user's email address
        ]
    }
};
