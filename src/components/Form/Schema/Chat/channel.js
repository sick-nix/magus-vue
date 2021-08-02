export default function (params = {}) {
    return [
        {
            type: 'text',
            name: 'name',
            label: 'Enter the channel\'s name',
            validation: 'required'
        },
        {
            type: 'vue-select',
            label: 'Choose the users',
            name: 'users',
            multiple: true,
            options: params.options,
            '@search': params.search,
            '@open': params.selectOpen
        },
        {
            type: 'group',
            class: "form-actions",
            children: [
                {
                    type: "button",
                    'input-class': "btn",
                    label: "Cancel",
                    '@click': params.cancel
                },
                {
                    type: "button",
                    'input-class': "btn btn-primary",
                    label: "Create Channel",
                    '@click': params.create
                }
            ]
        }
    ]
}