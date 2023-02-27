class Outgoing {
    static getLastStatus(statuses) {
        return statuses.find(status => status.dateTo === null);
    }
}

export default Outgoing;