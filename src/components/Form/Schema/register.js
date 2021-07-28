export default function (params = {}) {
    return [
        {
            type: 'text',
            name: 'email',
            label: 'Enter your email',
            validation: 'required|email|available',
            validationRules: {
                available: params.available
            },
            validationMessages: {
                available: 'Username is already taken'
            }
        },
        {
            type: 'text',
            name: 'emailConfirm',
            label: 'Confirm your email',
            validation: '^required|email|confirm:email',
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
            validation: '^required|confirm:password',
            validationName: 'Password confirmation'
        },
        {
            type: 'text',
            name: 'username',
            label: 'Enter your username',
            validation: 'required|matches:/[a-zA-Z0-9_]+/|available',
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