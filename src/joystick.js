const robot = require("robotjs");

const mouse = (device, config) => {
  const position = robot.getMousePos();

  switch (device.buttons.analogStick) {
    case device.Directions.UP:
      robot.moveMouseSmooth(position.x, position.y - config.stick.speed);
      break;
    case device.Directions.UP_LEFT:
      robot.moveMouseSmooth(
        position.x - config.stick.speed,
        position.y - config.stick.speed
      );
      break;
    case device.Directions.UP_RIGHT:
      robot.moveMouseSmooth(
        position.x + config.stick.speed,
        position.y - config.stick.speed
      );
      break;
    case device.Directions.DOWN:
      robot.moveMouseSmooth(position.x, position.y + config.stick.speed);
      break;
    case device.Directions.DOWN_LEFT:
      robot.moveMouseSmooth(
        position.x - config.stick.speed,
        position.y + config.stick.speed
      );
      break;
    case device.Directions.DOWN_RIGHT:
      robot.moveMouseSmooth(
        position.x + config.stick.speed,
        position.y + config.stick.speed
      );
      break;
    case device.Directions.LEFT:
      robot.moveMouseSmooth(position.x - config.stick.speed, position.y);
      break;
    case device.Directions.RIGHT:
      robot.moveMouseSmooth(position.x + config.stick.speed, position.y);
      break;
  }
};

const currently_pressed = {};

const keypress = (device, config) => {
  // TODO
};

module.exports = {
  mouse,
  keypress
};
