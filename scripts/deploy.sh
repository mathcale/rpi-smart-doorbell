#!/bin/bash

SECONDS=0
echo "Deploying project..."

rsync \
  -avz \
  --exclude node_modules \
  --exclude .git \
  --exclude scripts \
  . \
  pi@pizero.local:~/dev/rpi-smart-doorbell

echo "Done in ${SECONDS}s"
