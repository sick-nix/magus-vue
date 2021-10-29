export default function (params = {}) {
    return [
        {
            type: 'email',
            name: 'email',
            label: 'Enter your email',
            validation: 'bail|required|email|available',
            validationRules: {
                available: params.available
            },
            validationMessages: {
                available: 'Email is already taken'
            },
        },
        {
            type: 'email',
            name: 'emailConfirm',
            label: 'Confirm your email',
            validation: 'bail|required|email|confirm:email',
            validationName: 'Email confirmation'
        },
        {
            type: 'password',
            name: 'password',
            label: 'Enter a password',
            validation: 'required'
        },
        {
            type: 'password',
            name: 'passwordConfirm',
            label: 'Confirm your password',
            validation: 'bail|required|confirm:password',
            validationName: 'Password confirmation'
        },
        {
            type: 'text',
            name: 'username',
            label: 'Enter your username',
            validation: 'bail|required|matches:/[a-zA-Z0-9_]+/|available',
            validationRules: {
                available: params.available,
            },
            validationMessages: {
                matches: 'Username should only contain letters (A-Z and/or a-z), numbers or underscore (_)',
                available: 'Username is already taken'
            }
        }
    ]
}