class DateFormater {
    static dateToTableFormat(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const d = new Date(date);

        return d.toLocaleDateString("ru-RU", options);
    }

    static timeToTableFormat(date) {
        const d = new Date(date);

        return d.toLocaleTimeString("ru-RU");
    }

    static dateTimeToString(date) {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        const d = new Date(date);

        return `${d.toLocaleDateString("ru-RU", options)} ${d.toLocaleTimeString("ru-RU")}`
    }
}

export default DateFormater;