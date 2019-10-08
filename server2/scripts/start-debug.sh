#!/bin/bash

yarn tsnd \
  --project tsconfig.build.json \
  --no-notify \
  --inspect \
  src/server.ts
