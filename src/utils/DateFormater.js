class DateFormater {
    static toTableFormat(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };

        return date.toLocaleDateString("ru-RU", options);
    }
}

export default DateFormater;