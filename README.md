# 🎮 Joy Control

Control your PC with a Joy Con!

## Installation

1. Clone this repository (`git clone https://github.com/jakehamilton/joy-control`)
2. Install dependencies (`yarn`)

## Usage

For now, you can run this program using the command `node src/index.js`. Here is an
example:

```shell
node src/index.js --config ./config.toml
```

You **MUST** supply a config file.

## Config

Here is an example config file:

```toml
[left]
[left.stick]
action = "mouse"
speed = 10
poll = 33

[left.dpadUp]
action = "keytoggle"
on = "change"
key = "a"
[left.dpadDown]
action = "keytoggle"
on = "change"
key = "b"
[left.dpadLeft]
action = "keytoggle"
on = "change"
key = "c"
[left.dpadRight]
action = "keytoggle"
on = "change"
key = "d"
[left.minus]
action = "keytoggle"
on = "change"
key = "e"
[left.screenshot]
action = "keytoggle"
on = "change"
key = "f"
[left.sl]
action = "keytoggle"
on = "change"
key = "g"
[left.sr]
action = "keytoggle"
on = "change"
key = "h"
[left.l]
action = "keytoggle"
on = "change"
key = "i"
[left.zl]
action = "keytoggle"
on = "change"
key = "j"

[right]
[right.stick]
action = "mouse"
speed = 20

[right.a]
action = "keytoggle"
on = "change"
key = "k"
[right.x]
action = "keytoggle"
on = "change"
key = "l"
[right.b]
action = "keytoggle"
on = "change"
key = "m"
[right.y]
action = "keytoggle"
on = "change"
key = "n"
[right.plus]
action = "keytoggle"
on = "change"
key = "o"
[right.home]
action = "keytoggle"
on = "change"
key = "p"
[right.sl]
action = "keytoggle"
on = "change"
key = "q"
[right.sr]
action = "keytoggle"
on = "change"
key = "s"
[right.r]
action = "keytoggle"
on = "change"
key = "t"
[right.zr]
action = "keytoggle"
on = "change"
key = "u"
```
