module.exports = (robot) => {
    robot.on('issue', (event) => {
        console.log(event);
        if(event.object_attributes.action === "open"){
            robot.client.projects.issues.notes.create(event.project.id, event.object_attributes.iid, {body: "Stefan sagt: Ich machs!"});
        }
    });
};