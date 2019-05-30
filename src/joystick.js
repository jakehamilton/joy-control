const robot = require("robotjs");
const actions = require("./actions");

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

// track joystick state for each device
const joystick_state = {};

const custom = (descriptor, device, config) => {
  let node = null;

  switch (device.buttons.analogStick) {
    case device.Directions.UP:
      if (config.stick.hasOwnProperty("up")) {
        node = config.stick.up;
      }
      break;
    case device.Directions.UP_LEFT:
      if (config.stick.hasOwnProperty("upLeft")) {
        node = config.stick.upLeft;
      }
      break;
    case device.Directions.UP_RIGHT:
      if (config.stick.hasOwnProperty("upRight")) {
        node = config.stick.upRight;
      }
      break;
    case device.Directions.DOWN:
      if (config.stick.hasOwnProperty("down")) {
        node = config.stick.down;
      }
      break;
    case device.Directions.DOWN_LEFT:
      if (config.stick.hasOwnProperty("downLeft")) {
        node = config.stick.downLeft;
      }
      break;
    case device.Directions.DOWN_RIGHT:
      if (config.stick.hasOwnProperty("downRight")) {
        node = config.stick.downRight;
      }
      break;
    case device.Directions.LEFT:
      if (config.stick.hasOwnProperty("left")) {
        node = config.stick.left;
      }
      break;
    case device.Directions.RIGHT:
      if (config.stick.hasOwnProperty("right")) {
        node = config.stick.right;
      }
      break;
  }

  if (joystick_state[descriptor.serialNumber]) {
    const state = joystick_state[descriptor.serialNumber];

    if ((node === null || node.action !== state.last) && state.cleanup) {
      const action = actions[state.cleanup.action];
      action.apply(action, state.cleanup.args);
    }
  } else {
    joystick_state[descriptor.serialNumber] = {};
  }

  if (node) {
    joystick_state[descriptor.serialNumber].last = node.action;
    joystick_state[descriptor.serialNumber].cleanup = actions[node.action](
      config,
      node
    );
  } else {
    joystick_state[descriptor.serialNumber] = {};
  }
};

module.exports = {
  mouse,
  custom
};
