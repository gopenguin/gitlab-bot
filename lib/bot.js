const {EventEmitter} = require('promise-events');
const createGitlabClient = require('node-gitlab-api');

const reformatEventName = {"Issue": "issue", "MergeReguest": "merge_request", "Commit": "commit", "Snippet": "snippet"};

class Bot {

    constructor(usertoken, url, logger) {
        this.events = new EventEmitter();
        this.logger = logger;

        this.client = createGitlabClient({
            url: url,
            token: usertoken
        });
        if (!this.authenticate()) {
            throw new Error("Authentication failed");
        }
    }

    async authenticate() {
        try {
            await this.client.projects.all({per_page: 1, max_pages: 1}); //projects are not interesting. it should only be used for authentication
            return true;
        } catch (exception) {
            this.logger.error(exception);
            return false;
        }
    }

    async receive(event) {
        return this.events.emit('*', event).then(() => {
            return this.events.emit(event.event, event);
        });
    }

    on(event, callback) {
        if (event.constructor === Array) {                //recursively call for each event in the array
            event.forEach(e => this.on(e, callback));
            return;
        }

        const [eventName, action] = event.split(".");

        if (action === 'note') {
            [eventName, action] = [action, reformatEventName[eventName]];
        }

        return this.events.on(eventName, async event => {
            if (!action || action === event.payload.object_attributes.action || action === event.payload.object_attributes.noteable_type) {
                try {
                    await callback(event);
                } catch (exception) {
                    this.logger.error(exception);
                }
            }
        });
    }
}

module.exports = (...args) => new Bot(...args);