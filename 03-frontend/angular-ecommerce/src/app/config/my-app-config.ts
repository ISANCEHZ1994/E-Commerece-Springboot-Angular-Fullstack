export default {
    // https://manage.auth0.com/dashboard/us/dev-neex6mmz/applications/NxDLKox3ItnE6JEFpuOcnVDY6a3pJYu0/settings
    // https://login.okta.com/
    // https://developer.okta.com/login/
    // https://dev-18207900-admin.okta.com/admin/getting-started

    oidc: {
        clientId:       '0oa4r47f60ougeK5Z5d7',
        issuer:         'https://dev-18207900.okta.com/oauth2/default',        
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
