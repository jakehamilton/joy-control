const actions = require("./actions");
const joystick = require("./joystick");

// hard-coded numbers for the left and right joycon product id values
// TODO: Check other joycons and confirm this is an okay way to detect them
const LEFT_CONTROLLER_ID = 8198;
const RIGHT_CONTROLLER_ID = 8199;

const controller = (descriptor, config) => {
  const type = descriptor.productId;
  const device = descriptor.open();

  device.setPlayerLEDs(device.LED_VALUES.ONE);

  let identifier = "left";
  switch (type) {
    case LEFT_CONTROLLER_ID:
      identifier = "left";
      break;
    case RIGHT_CONTROLLER_ID:
      identifier = "right";
      break;
  }

  const device_config = config[identifier];

  let interval = null;
  const loop = () => {
    switch (device_config.stick.action) {
      case "mouse": {
        joystick.mouse(device, device_config);
        break;
      }
      case "keypress": {
        joystick.keypress(device, device_config);
        break;
      }
    }
  };

  // loop is only necessary when monitoring joystick position
  if (device_config.hasOwnProperty("stick")) {
    interval = setInterval(loop, device_config.stick.poll);
  }

  // attach event listeners for each button action
  for (const [key, value] of Object.entries(device_config)) {
    // stick is handled separately, ignore it for this loop
    if (key === "stick") {
      continue;
    }

    if (!value.hasOwnProperty("action")) {
      // this button has no action, ignore it
      continue;
    }

    let event = "down";

    if (value.hasOwnProperty("on")) {
      event = value.on;
    }

    // only listen for events that are supported
    if (actions.hasOwnProperty(value.action)) {
      const action = value.action;
      device.on(`${event}:${key}`, pressed => {
        actions[action](config, value, pressed);
      });
    } else {
      console.error(`Unknown action "${value.action}".`);
    }
  }

  return {
    destroy() {
      if (interval !== null) {
        clearInterval(interval);
      }

      device.close();
    }
  };
};

module.exports = controller;
