#!/bin/sh

# Window manager config
bspc config window_gap 0         # No gap between windows
bspc config border_width 0       # No gap between windows

bspc config click_to_focus true  # Focus follow mouse click

# Five desktops
bspc monitor -d I II III IV V \
terminal_1 terminal_2 terminal_3 terminal_4 terminal_5 
