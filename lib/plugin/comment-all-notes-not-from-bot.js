module.exports = (robot) => {
    robot.on(['issue.note', 'merge_request.note', 'snippet.note', 'commit.note'], (event) => {
        if(event.payload.object_attributes.author_id !== 1120){
            robot.logger.info("Commenting on " + event.payload.object_attributes.title);
        }
    });

};