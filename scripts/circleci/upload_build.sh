#!/bin/bash

set -e

if [ -z $CI_PULL_REQUEST ] && [ -n "$BUILD_SERVER_ENDPOINT" ]; then
  curl \
    -F "reacc.development=@build/dist/react.development.js" \
    -F "reacc.production.min=@build/dist/react.production.min.js" \
    -F "reacc-dom.development=@build/dist/react-dom.development.js" \
    -F "reacc-dom.production.min=@build/dist/react-dom.production.min.js" \
    -F "reacc-dom-server.browser.development=@build/dist/react-dom-server.browser.development.js" \
    -F "reacc-dom-server.browser.production.min=@build/dist/react-dom-server.browser.production.min.js" \
    -F "commit=$CIRCLE_SHA1" \
    -F "date=`git log --format='%ct' -1`" \
    -F "pull_request=false" \
    -F "token=$BUILD_SERVER_TOKEN" \
    -F "branch=$CIRCLE_BRANCH" \
    $BUILD_SERVER_ENDPOINT
fi
