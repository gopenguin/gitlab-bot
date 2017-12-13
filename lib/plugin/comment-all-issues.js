module.exports = (robot) => {
    robot.on('issue.open', (event) => {
        console.log(event);
        robot.logger.info("Commenting on " + event.payload.object_attributes.title);
        robot.client.projects.issues.notes.create(event.payload.object_attributes.project_id, event.payload.object_attributes.iid, {body: "Stefan sagt: Ich machs!"});
    });
};