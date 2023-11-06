#!/bin/bash -eo pipefail
#!/bin/bash

# This script will install chrome and chrome driver before running automated tests
# This script comes from CircleCI's Browser Tools orb https://circleci.com/developer/orbs/orb/circleci/browser-tools
# From circleci https://github.com/CircleCI-Public/browser-tools-orb/blob/main/src/scripts/install-chrome.sh
# and https://github.com/CircleCI-Public/browser-tools-orb/blob/main/src/scripts/install-chromedriver.sh

export ORB_PARAM_REPLACE_EXISTING="No"
export ORB_PARAM_CHROME_VERSION="latest"
export ORB_PARAM_CHANNEL="stable"
export ORB_PARAM_DRIVER_INSTALL_DIR="/usr/local/bin"

echo "running cci-npm-test.sh... CURRENT_DIR: $CURRENT_DIR, and SUBPROJECT_DIR: $SUBPROJECT_DIR"

if [[ $EUID == 0 ]]; then export SUDO=""; else export SUDO="sudo"; fi
# install chrome
if uname -a | grep Darwin >/dev/null 2>&1; then
  echo "Preparing Chrome installation for MacOS-based systems"
  # Universal MacOS .pkg with license pre-accepted: https://support.google.com/chrome/a/answer/9915669?hl=en
  CHROME_MAC_URL="https://dl.google.com/chrome/mac/${ORB_PARAM_CHANNEL}/accept_tos%3Dhttps%253A%252F%252Fwww.google.com%252Fintl%252Fen_ph%252Fchrome%252Fterms%252F%26_and_accept_tos%3Dhttps%253A%252F%252Fpolicies.google.com%252Fterms/googlechrome.pkg"
  CHROME_TEMP_DIR="$(mktemp -d)"
  curl -L -o "$CHROME_TEMP_DIR/googlechrome.pkg" "$CHROME_MAC_URL"
  sudo /usr/sbin/installer -pkg "$CHROME_TEMP_DIR/googlechrome.pkg" -target /
  sudo rm -rf "$CHROME_TEMP_DIR"
  echo '#!/usr/bin/env bash' >> google-chrome-$ORB_PARAM_CHANNEL
  if [[ $ORB_PARAM_CHANNEL == "beta" ]]; then
    xattr -rc "/Applications/Google Chrome Beta.app"
    echo '/Applications/Google\ Chrome\ Beta.app/Contents/MacOS/Google\ Chrome\ Beta "$@"' >> google-chrome-$ORB_PARAM_CHANNEL
  else
    xattr -rc "/Applications/Google Chrome.app"
    echo '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome "$@"' >> google-chrome-$ORB_PARAM_CHANNEL
  fi
  sudo mv google-chrome-$ORB_PARAM_CHANNEL /usr/local/bin/
  sudo chmod +x /usr/local/bin/google-chrome-$ORB_PARAM_CHANNEL
  # test/verify installation
  if google-chrome-$ORB_PARAM_CHANNEL --version >/dev/null 2>&1; then
    echo "$(google-chrome-$ORB_PARAM_CHANNEL --version)has been installed in the /Applications directory"
    echo "A shortcut has also been created at $(command -v google-chrome)"
  else
    echo "The latest release of Google Chrome (${ORB_PARAM_CHANNEL}) failed to install."
    exit 1
  fi
elif command -v yum >/dev/null 2>&1; then
  echo "Preparing Chrome installation for RedHat-based systems"
  # download chrome
  if [[ "$ORB_PARAM_CHROME_VERSION" == "latest" ]]; then
    CHROME_URL="https://dl.google.com/linux/direct/google-chrome-stable_current_x86_64.rpm"
  else
    CHROME_URL="https://dl.google.com/linux/chrome/rpm/stable/x86_64/google-chrome-${ORB_PARAM_CHANNEL}-$ORB_PARAM_CHROME_VERSION-1.x86_64.rpm"
  fi
  curl --silent --show-error --location --fail --retry 3 \
    --output google-chrome.rpm \
    "$CHROME_URL"
  curl --silent --show-error --location --fail --retry 3 \
    --output liberation-fonts.rpm \
    http://mirror.centos.org/centos/7/os/x86_64/Packages/liberation-fonts-1.07.2-16.el7.noarch.rpm
  $SUDO yum localinstall -y liberation-fonts.rpm \
    >/dev/null 2>&1
  $SUDO yum localinstall -y google-chrome.rpm \
    >/dev/null 2>&1
  rm -rf google-chrome.rpm liberation-fonts.rpm
else
  # download chrome
  echo "Preparing Chrome installation for Debian-based systems"
  if [[ "$ORB_PARAM_CHROME_VERSION" == "latest" ]]; then
    ENV_IS_ARM=$(! dpkg --print-architecture | grep -q arm; echo $?)
    wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | $SUDO apt-key add -
    if [ "$ENV_IS_ARM" == "arm" ]; then
      echo "Installing Chrome for ARM64"
      $SUDO sh -c 'echo "deb [arch=arm64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list'
    else
      echo "Installing Chrome for AMD64"
      $SUDO sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list'
    fi
    $SUDO apt-get update
    DEBIAN_FRONTEND=noninteractive $SUDO apt-get install -y google-chrome-${ORB_PARAM_CHANNEL}
  else
    # Google does not keep older releases in their PPA, but they can be installed manually. HTTPS should be enough to secure the download.
    wget --no-verbose -O /tmp/chrome.deb "https://dl.google.com/linux/chrome/deb/pool/main/g/google-chrome-stable/google-chrome-stable_${ORB_PARAM_CHROME_VERSION}-1_amd64.deb" \
      && $SUDO apt-get install -y /tmp/chrome.deb \
      && rm /tmp/chrome.deb
  fi
fi

# test/verify installation
if [[ "$ORB_PARAM_CHROME_VERSION" != "latest" ]]; then
  if google-chrome-$ORB_PARAM_CHANNEL --version | grep "$ORB_PARAM_CHROME_VERSION" >/dev/null 2>&1; then
    :
  else
    echo "Google Chrome v${ORB_PARAM_CHROME_VERSION} (${ORB_PARAM_CHANNEL}) failed to install."
    exit 1
  fi
else
  if google-chrome-$ORB_PARAM_CHANNEL --version >/dev/null 2>&1; then
    :
  else
    echo "The latest release of Google Chrome (${ORB_PARAM_CHANNEL}) failed to install."
    exit 1
  fi
  echo "$(google-chrome-$ORB_PARAM_CHANNEL --version) has been installed to $(command -v google-chrome-$ORB_PARAM_CHANNEL)"
  echo "Chrome: $ORB_PARAM_CHROME_VERSION" >>"${HOME}/.browser-versions"
fi

# determine_chrome_version
if uname -a | grep Darwin >/dev/null 2>&1; then
  echo "System detected as MacOS"

  if [ -f "/usr/local/bin/google-chrome-stable" ]; then
    CHROME_VERSION="$(/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --version)"
  else
    CHROME_VERSION="$(/Applications/Google\ Chrome\ Beta.app/Contents/MacOS/Google\ Chrome\ Beta --version)"
  fi
  PLATFORM=mac64

elif grep Alpine /etc/issue >/dev/null 2>&1; then
  apk update >/dev/null 2>&1 &&
    apk add --no-cache chromium-chromedriver >/dev/null

  # verify version
  echo "$(chromedriver --version) has been installed to $(command -v chromedriver)"
else
  CHROME_VERSION="$(google-chrome --version)"
  PLATFORM=linux64
fi

CHROME_VERSION_STRING="$(echo "$CHROME_VERSION" | sed 's/.*Google Chrome //' | sed 's/.*Chromium //')"

# print Chrome version
echo "Installed version of Google Chrome is $CHROME_VERSION_STRING"

# determine chromedriver release
CHROMEDRIVER_RELEASE="${CHROME_VERSION_STRING%%.*}"
# manually override chrome driver release version to ensure successful build pipeline
CHROMEDRIVER_RELEASE_OVERRIDE="114.0.5735"

CHROME_RELEASE="${CHROMEDRIVER_RELEASE}"
CHROMEDRIVER_VERSION=$(curl --silent --show-error --location --fail --retry 3 \
  "https://chromedriver.storage.googleapis.com/LATEST_RELEASE_$CHROMEDRIVER_RELEASE_OVERRIDE")

# installation check
if command -v chromedriver >/dev/null 2>&1; then
  if chromedriver --version | grep "$CHROMEDRIVER_VERSION" >/dev/null 2>&1; then
    echo "ChromeDriver $CHROMEDRIVER_VERSION is already installed"
  else
    echo "A different version of ChromeDriver is installed ($(chromedriver --version)); removing it"
    $SUDO rm -f "$(command -v chromedriver)"
  fi
fi

echo "ChromeDriver $CHROMEDRIVER_VERSION will be installed"

# download chromedriver
curl --show-error --location --fail --retry 3 \
  --output chromedriver_$PLATFORM.zip \
  "http://chromedriver.storage.googleapis.com/$CHROMEDRIVER_VERSION/chromedriver_$PLATFORM.zip"

# setup chromedriver installation
if command -v yum >/dev/null 2>&1; then
  yum install -y unzip >/dev/null 2>&1
fi

unzip "chromedriver_$PLATFORM.zip" >/dev/null 2>&1
rm -rf "chromedriver_$PLATFORM.zip"

$SUDO mv chromedriver "$ORB_PARAM_DRIVER_INSTALL_DIR"
$SUDO chmod +x "$ORB_PARAM_DRIVER_INSTALL_DIR/chromedriver"

# test/verify version
if chromedriver --version | grep "$CHROMEDRIVER_VERSION" >/dev/null 2>&1; then
  echo "$(chromedriver --version) has been installed to $(command -v chromedriver)"
  readonly base_dir="${CIRCLE_WORKING_DIRECTORY/\~/$HOME}"
  rm -f "${base_dir}/LICENSE.chromedriver"
else
  echo "Something went wrong; ChromeDriver could not be installed"
  exit 1
fi

# Run tests in a CI environment without opening a browser window
npx ng test --project test-results-ui --no-watch --no-progress --code-coverage
# Give feedback