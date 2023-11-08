#!/bin/bash

set -u -o pipefail

echo "cci-npm-install.sh script is starting..."

CURRENT_DIR="${PWD}"
SUBPROJECT_DIR="project/not-crm"

# install dependencies in the component repository first
if [[ -f "$SUBPROJECT_DIR/package.json" ]]; then
  cd "$SUBPROJECT_DIR" || exit # in case fail
  echo "Installing dependencies in $PWD"
  npm install --no-audit
else
  echo "No package was found in $SUBPROJECT_DIR/package.json"
fi

# Install root level dependencies
cd "$CURRENT_DIR" || exit # in case fail
echo "Installing dependencies in $PWD ..."

echo "Listing everyting inside this current directory is: $CURRENT_DIR: $(ls -lah)"

npm install --no-audit
