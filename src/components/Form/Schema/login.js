export default function (params = {}) {
    return [
        {
            type: 'text',
            name: 'email',
            label: 'Enter your email',
        },
        {
            type: 'password',
            name: 'password',
            label: 'Enter your password',
        }
    ]
}