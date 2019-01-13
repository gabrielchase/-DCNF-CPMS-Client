const { MONTHS } = require('./constants')

module.exports = {
    getHeadersWithJWT: () => {
        const token = localStorage.getItem('token')
        return {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    },
    displayDate: (d) => {
        const date_string = d.split('T')[0]
        const year = date_string.split('-')[0]
        const month = date_string.split('-')[1]
        const date = date_string.split('-')[2]
        return `${MONTHS[month-1]} ${date}, ${year}`
    },
    displayMoney: (m) => {
        return 'P' + m.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}