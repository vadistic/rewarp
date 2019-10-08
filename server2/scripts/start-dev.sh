#!/bin/bash

yarn tsnd \
  --project tsconfig.build.json \
  --transpileOnly \
  --no-notify \
  --clear \
  --debounce 3000 \
  src/server.ts
