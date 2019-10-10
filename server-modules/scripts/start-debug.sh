#!/bin/bash

yarn env \
   tsnd \
    --require tsconfig-paths/register \
    --project tsconfig.build.json \
    --no-notify \
    --inspect \
    src/server.ts
