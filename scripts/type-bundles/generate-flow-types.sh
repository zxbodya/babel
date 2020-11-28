#!/usr/bin/env bash
set -e

helperPath=$(realpath "$(dirname "$0")")
rootPath=$(realpath "$(dirname "$(dirname "$helperPath")")")

package=babel-generator

echo "Bundle d.ts types for ${package}"
INPUT_DTS="${rootPath}/packages/${package}/lib/index.d.ts" \
  OUTPUT_DTS="${rootPath}/lib/${package}.d.ts" \
  yarn run rollup -c "${helperPath}/rollup.config.js"

echo "Generating flow types for ${package}"
yarn run flowgen --no-inexact -o "${rootPath}/lib/${package}.js.flow" "${rootPath}/lib/${package}.d.ts"
