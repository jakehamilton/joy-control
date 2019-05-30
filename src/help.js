module.exports = () => {
  process.stdout.write(`joy-control

USAGE
  joy-control --config ./config.toml

CONFIG DOCUMENTATION

  One section can be created for each Joy-Con using the following in
  TOML.

    [left]
    [right]

  Within each section, you can apply different actions for a given
  button. For example:

    [left]
    [left.dpadLeft]
    action = "keypress"
    key = "a"

  Each button or joystick section _must_ supply an action. As well, some
  actions are only valid for either buttons or joysticks.

  The following sections can be used to modify joysticks or buttons.

    [left.stick]
    [left.stick.up]
    [left.stick.down]
    [left.stick.left]
    [left.stick.right]
    [left.stick.upLeft]
    [left.stick.upRight]
    [left.stick.downLeft]
    [left.stick.downRight]

    [right.stick]
    [right.stick.up]
    [right.stick.down]
    [right.stick.right]
    [right.stick.right]
    [right.stick.upLeft]
    [right.stick.upRight]
    [right.stick.downLeft]
    [right.stick.downRight]

    [left.dpadUp]
    [left.dpadDown]
    [left.dpadLeft]
    [left.dpadRight]
    [left.minus]
    [left.screenshot]
    [left.sl]
    [left.sr]
    [left.l]
    [left.zl]

    [right.a]
    [right.b]
    [right.x]
    [right.y]
    [right.plus]
    [right.home]
    [right.sl]
    [right.sr]
    [right.r]
    [right.zr]

  For joysticks, the following show all possible configurations.

    # Control the mouse
    [left]
    [left.stick]
    action = "mouse"
    speed = 20 # Speed of the cursor in px
    poll = 33 # Time in ms to poll the joystick

    # Run an action based on the stick position
    [left]
    [left.stick]
    action = "custom"
    [left.stick.up]
    action = "keypress" # Any normal key action is valid (shown below)
    key = "a"

  For any normal button, the following show all possible configurations.

    # Press a key
    [left.dpadUp]
    action = "keypress"
    key = "a" # Any key supported by RobotJS
    modifier = "shift" # Optional: Any modifier supported by RobotJS (can also be an array of strings)

    # Toggle a key (useful with on: change)
    [left.dpadUp]
    action = "keytoggle"
    key = "a" # Any key supported by RobotJS
    modifier = "shift" # Optional: Any modifier supported by RobotJS (can also be an array of strings)
    on = "change" # Events explained below

    # Toggle the mouse (useful with on: change)
    [left.dpadUp]
    action = "mousetoggle"
    on = "change" # Events explained below

    # Execute a command
    [left.dpadUp]
    action = "command"
    exec = "echo hi"

  Button actions can specify what event should trigger them. The following are all valid
  event configurations.

    on = "up"
    on = "down"
    on = "change"

  When set to listen for "change", toggle events will activate and deactivate when you
  push and release a button. This allows things like a mouse click to be held until a
  button is released.
`);
};
