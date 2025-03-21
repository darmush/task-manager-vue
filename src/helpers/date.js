const dateMethods = {
    getToday() {
        const today = new Date();
        const date = ('0' + today.getDate()).slice(-2) + '/'
            + ('0' + (today.getMonth() + 1)).slice(-2) + '/'
            + ('' + today.getFullYear()).slice(-2);
        return date;
    },
    getDayFromDate(date) {
        const day = ('0' + date.getDate()).slice(-2) + '/'
            + ('0' + (date.getMonth() + 1)).slice(-2) + '/'
            + ('' + date.getFullYear()).slice(-2);
        return day;
    },
    parseDate(date) {
        const dateParse = date.split('/');
        const newDate = new Date('20' + dateParse[2], dateParse[1] - 1, dateParse[0]);
        return newDate;
    },
    compareDates(a, b) {
        const aDate = this.parseDate(a);
        const bDate = this.parseDate(b);
        const result = aDate - bDate < 0 ? -1 : aDate - bDate > 0 ? 1 : aDate - bDate == 0 ? 0 : '';
        return result;
    },
    compareToday(a) {
        const today = this.getToday();
        const aDate = this.parseDate(a);
        const result = aDate - today < 0 ? false : true;
        return result;
    },
};

export default dateMethods;
