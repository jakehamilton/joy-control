const robot = require("robotjs");

module.exports = {
  mousetoggle(config, node, pressed) {
    if (pressed) {
      robot.mouseToggle("down");
    } else {
      robot.mouseToggle("up");
    }
  },
  keypress(config, node) {
    robot.keyTap(node.key);
  }
};
