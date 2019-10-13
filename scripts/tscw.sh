 #!/usr/bin/env bash

NAME=$1

echo TSC-WATCH - APP: $NAME

set TS_NODE_PROJECT "apps/$NAME/tsconfig.json"

yarn tsc-watch -b apps/$NAME --onSuccess "node ./backend/apps/$NAME/main.js"
