module.exports = (robot) => {
    robot.on('*', (event) => {
        console.log(event);
    });
};