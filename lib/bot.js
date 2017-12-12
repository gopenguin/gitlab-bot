const {EventEmitter} = require('promise-events');
const createGitlabclient = require('node-gitlab-api');

class Bot {
    constructor(usertoken, url) {
        this.events = new EventEmitter();

        this.client = createGitlabclient({
            url: url,
            token: usertoken
        });
        if(!this.authenticate()){
            throw new Error("Authentication failed");
        }
    }

    async authenticate(){
        try {
            let projects = await this.client.projects.all(); //projects are not interesting. it should only be used for authentication
            return true;
        }catch(exception){
            console.log(exception);
            return false;
        }
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

module.exports = (...args) => new Bot(...args);