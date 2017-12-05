const {EventEmitter} = require('promise-events');

class Bot {
    constructor() {
        this.events = new EventEmitter()
    }

    async receive(event) {
        return this.events.emit('*', event).then(() => {
            return this.events.emit(event.event, event);
        });
    }

    on(event, callback) {
        this.events.on(event, callback);
    }
}

module.exports = () => new Bot();