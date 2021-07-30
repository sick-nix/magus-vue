export default function (params = {}) {
    return [
        {
            type: 'email',
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