#!/bin/sh

# Window manager config
bspc config window_gap 0         # No gap between windows
bspc config border_width 0       # No gap between windows

bspc config click_to_focus true  # Focus follow mouse click

# Five desktops
bspc monitor -d default
