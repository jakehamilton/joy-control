const robot = require("robotjs");
const { execSync } = require("child_process");

module.exports = {
  noop() {},
  mousetoggle(config, node, pressed = true) {
    if (pressed) {
      robot.mouseToggle("down");
    } else {
      robot.mouseToggle("up");
    }

    return {
      action: "mousetoggle",
      args: [config, node, !pressed]
    };
  },
  keypress(config, node) {
    robot.keyTap(node.key, node.modifier || []);

    return {
      action: "noop",
      args: []
    };
  },
  keytoggle(config, node, pressed = true) {
    const state = pressed ? "down" : "up";
    robot.keyToggle(node.key, state, node.modifier || []);

    return {
      action: "keytoggle",
      args: [config, node, !pressed]
    };
  },
  command(config, node) {
    execSync(node.command, {
      input: node.input || undefined,
      stdio: [
        node.stdin === true ? process.stdin : null,
        process.stdout,
        process.stderr
      ],
      windowsHide: true
    });

    return {
      action: "noop",
      args: []
    };
  }
};
