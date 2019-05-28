const fs = require("fs");
const path = require("path");
const arg = require("arg");
const toml = require("toml");
const joycons = require("switch-joy-con");

const controller = require("./controller");

const args = arg({
  "--config": String,
  "--help": Boolean
});

if (!args["--config"]) {
  console.error("You must specify a config file.");
  process.exit(1);
}

const config_path = path.isAbsolute(args["--config"])
  ? path.resolve(args["--config"])
  : path.resolve(process.cwd(), args["--config"]);

let raw_config = null;

try {
  raw_config = fs.readFileSync(config_path);
} catch (error) {
  console.error(`
${error}
  `);
  process.exit(1);
}

let config = null;

// parse the toml file, may fail
try {
  config = JSON.parse(JSON.stringify(toml.parse(raw_config)));
} catch (error) {
  console.error(
    `
Error parsing config:
    ${error.message}
    -> ${config_path}:${error.line}:${error.column}
`
  );
  process.exit(1);
}

// normalize config
if (!config.hasOwnProperty("left")) {
  config.left = {};
}
if (!config.hasOwnProperty("right")) {
  config.right = {};
}

// default joystick polling to 1000/60ms
if (
  config.left.hasOwnProperty("stick") &&
  !config.left.stick.hasOwnProperty("poll")
) {
  config.left.stick.poll = 1000 / 60;
}
if (
  config.right.hasOwnProperty("stick") &&
  !config.right.stick.hasOwnProperty("poll")
) {
  config.right.stick.poll = 1000 / 60;
}

// default joystick speed to 10
if (
  config.left.hasOwnProperty("stick") &&
  !config.left.stick.hasOwnProperty("speed")
) {
  config.left.stick.speed = 10;
}
if (
  config.right.hasOwnProperty("stick") &&
  !config.right.stick.hasOwnProperty("speed")
) {
  config.right.stick.speed = 10;
}

// default joystick actions
if (
  config.left.hasOwnProperty("stick") &&
  !config.left.stick.hasOwnProperty("action")
) {
  config.left.stick.action = "keypress";
}
if (
  config.right.hasOwnProperty("stick") &&
  !config.right.stick.hasOwnProperty("action")
) {
  config.right.stick.action = "mouse";
}

const controllers = joycons
  .listConnectedJoyCons()
  .map(joycon => controller(joycon, config));

const cleanup = () => {
  for (const controller of controllers) {
    controller.destroy();
  }
};

process.on("SIGINT", () => {
  cleanup();
  process.exit();
});

// workaround for sigint on windows (https://stackoverflow.com/questions/10021373/what-is-the-windows-equivalent-of-process-onsigint-in-node-js)
if (process.platform === "win32") {
  const rl = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.on("SIGINT", function() {
    cleanup();
    process.emit("SIGINT");
  });
}
