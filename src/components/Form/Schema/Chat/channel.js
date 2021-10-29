import {ROOM_TYPES} from "constants/chat"

export default function (params = {}) {
    //@todo configure depending on the room type
    return Object.values(getChannelConfig(params))
}

export const getChannelConfig = (params) => {
    return {
        name: {
            type: 'text',
            name: 'name',
            label: 'Enter the channel\'s name',
            validation: 'required'
        },
        users: {
            type: 'vue-select',
            label: 'Choose the users',
            name: 'users',
            multiple: true,
            options: params.options,
            '@search': params.search,
            '@open': params.selectOpen
        },
        group: {
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
                    '@click': params.create,
                    disabled: params.hasErrors
                }
            ]
        },
        type: {
            type: 'hidden',
            name: 'type',
            value: ROOM_TYPES.CHANNEL
        }
    }
}