import moment from 'moment'

export const formatDateClient = (date,pattern="DD/MM/YYYY") => {
    return moment(date).format(pattern)
}

export const formatDateServer = (date,pattern="YYYY-MM-DD") => {
    return moment(date).format(pattern)
}