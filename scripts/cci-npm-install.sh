#!/bin/bash -eo pipefail
#!/bin/bash

CURRENT_DIR="${PWD}"
SUBPROJECT_DIR="projects/not-crm"

echo "running ssi-npm-install.sh... CURRENT_DIR: $CURRENT_DIR, and SUBPROJECT_DIR: $SUBPROJECT_DIR"

# install dependencies in the component repository first
if [[ -f "$SUBPROJECT_DIR/package.json" ]]; then
  cd $SUBPROJECT_DIR
  echo "Installing dependencies in $PWD"
  npm install --no-audit
else
  echo "No package was found in $SUBPROJECT_DIR/package.json"
fi

# Install root level dependencies
cd $CURRENT_DIR
echo "Installing dependencies in $PWD ..."

npm install --no-audit
