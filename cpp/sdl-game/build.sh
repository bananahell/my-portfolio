#!/bin/bash

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

OUTPUT_DIR="$REPO_ROOT/angular/public/wasm/sdl-game"
mkdir -p "$OUTPUT_DIR"

docker run --rm \
  -v "$REPO_ROOT/cpp/sdl-game:/src" \
  -v "$OUTPUT_DIR:/dist" \
  emscripten/emsdk:3.1.50 \
  emcc /src/main.c \
    -o /dist/game.js \
    -s USE_SDL=2 \
    -s WASM=1 \
    -O3

echo "Build complete. game.js and game.wasm are in angular/public/wasm/sdl-game/"
