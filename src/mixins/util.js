import { format } from 'date-fns'
import {getDateObj} from "util/date"

export const utilMixin = {
    computed: {
        getUserById() {
            return (room, id) => {
                return room.users.find(user => user._id === id)
            }
        },
        formatDate() {
            return date => {
                return format(getDateObj(date), 'u/M/d')
            }
        },
        formatTime() {
            return date => {
                return format(getDateObj(date), 'kk:mm')
            }
        },
        formatDateTime() {
            return date => `${this.formatDate(date)} ${this.formatTime(date)}`
        }
    }
}