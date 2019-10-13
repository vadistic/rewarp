#!/bin/bash

yarn env \
  tsnd \
    --require tsconfig-paths/register \
    --project tsconfig.build.json \
    --transpileOnly \
    --no-notify \
    --clear \
    --debounce 1500 \
    src/server.ts
