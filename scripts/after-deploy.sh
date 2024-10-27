#!/bin/bash
REPOSITORY=/home/ubuntu/build

cd $REPOSITORY

/usr/bin/pnpm install --frozen-lockfile

/usr/bin/pm2 start "pnpm start"