 #!/usr/bin/env bash

NAME=$1

echo TS-NODE - APP: $NAME

yarn ts-node \
  -r tsconfig-paths/register \
  --project ./tsconfig.base.json \
  apps/$NAME/main.ts

