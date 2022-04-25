module.exports = class IntervalManager {
    constructor(client) {
        this.client = client;
        this.intervals = [];
    }

    set(intervalID, funcRef, period) {
        if (!this.intervals[intervalID]) {
            this.intervals[intervalID] = setInterval(funcRef, period);
        } else {
            console.log(`Attempted to set ${intervalID} more than once.`);
        }
    }

    clear(id) {
        clearInterval(this.intervals[id]);
        delete this.intervals[id];
    }

    clearAllfunction() {
        const table = this.intervals;

        for (const i in table) {
            clearInterval(table[i]);
            delete table[i];
        }
    }

    any() {
        const table = this.intervals;
        let found = false;

        for (const i in table) {
            if (table[i] !== null) {
                found = table[i];
                break;
            }
        }
        return found;
    }

    intervals() {
        return this.intervals;
    }
};
