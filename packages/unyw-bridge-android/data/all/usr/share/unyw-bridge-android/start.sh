#!/bin/sh

# Create virtual screen on :3000
rm -f /tmp/.X3200-lock # Clear previous run
Xvfb :3200 -screen 0 "$SCREEN_WIDTH"x"$SCREEN_HEIGHT"x16 & sleep 0.5
p1pid=$! # Remember process Id, so it could be closed lately

echo "root:$UNYW_TOKEN_SSH" | chpasswd
mkdir -p /etc/dropbear
dropbear -RFE -p 12082 &
p2pid=$! # Remember process Id, so it could be closed lately

# Start window manager "bspw"
chmod +x /usr/share/unyw-bridge-android/bspwm.sh
bspwm -c /usr/share/unyw-bridge-android/bspwm.sh &
p3pid=$! # Remember process Id, so it could be closed lately


# Start screen streaming through vnc
# Looks like some flags are necessary to avoid random crashes on certain device
# Similar scenario: https://forums.linuxmint.com/viewtopic.php?t=247830
x11vnc -forever -passwd "$UNYW_TOKEN_VNC" -noscr  -noshm -noxdamage -noxrecord -nowf -xkb -shared -rfbport 12081 -solid "#efeff4"
p4pid=$! # Remember process Id, so it could be closed lately

# Close all processes if interrupted
kill $p1pid $p2pid $p3pid $p4pid
