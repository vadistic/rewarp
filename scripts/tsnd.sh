 #!/usr/bin/env bash

NAME=$1

echo TS-NODE-DEV - APP: $NAME

yarn ts-node-dev \
  --project ./tsconfig.base.json \
  --require ./scripts/register-dist.js \
  --watch dist/**,libs/** \
  --no-notify \
  --debounce 1500 \
  apps/$NAME/main.ts

