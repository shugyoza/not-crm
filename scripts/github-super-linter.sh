#!/bin/bash

# ref.: https://www.freecodecamp.org/news/github-super-linter/
# This script is to run github/super-linter locally
# We run it with the RUN_LOCAL flag to bypass some of the GitHub Actions checks. This automatically sets VALIDATE_ALL_CODEBASE to true.
# We map our local codebase to /tmp/lint so that the linter can pick up the code.
# The way we set environment variables is of course different, but the overall process of running the GitHub Super Linter remains the same.

if [ $(uname -m) == 'arm64' ]; then
  echo "This docker image can only be run on linux/amd64 platform"
  # docker run -e RUN_LOCAL=true -e USE_FIND_ALGORITHM=true -e VALIDATE_PYTHON_BLACK=true -v --platform linux/$(uname -m) "$PROJECT_DIRECTORY:/tmp/lint" "$IMAGE_TAG"
  exit 1
fi

IMAGE_TAG="github/super-linter"
PROJECT_DIRECTORY=$(pwd)

echo "Initializing github-super-linter.sh within this directory: $PROJECT_DIRECTORY."

# cleaning up previous process
# docker system prune

# remove any previous existing image with the same tag
docker rmi $IMAGE_TAG

# pulling the github/super-linter docker image
docker pull "$IMAGE_TAG":latest

# spin up docker container based on the pulled image
echo "running docker on default platform"
docker run -e RUN_LOCAL=true -e USE_FIND_ALGORITHM=true -e VALIDATE_PYTHON_BLACK=true -v "$PROJECT_DIRECTORY:/tmp/lint" "$IMAGE_TAG"