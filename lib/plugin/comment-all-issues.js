module.exports = (robot) => {
    robot.on('issue', (event) => {
        console.log(event);
        if(event.payload.object_attributes.action === "open"){
            robot.client.projects.issues.notes.create(event.payload.object_attributes.project_id, event.payload.object_attributes.iid, {body: "Stefan sagt: Ich machs!"});
        }
    });
};