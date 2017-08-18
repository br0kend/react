#!/bin/bash

set -e

if [ -n $GITHUB_TOKEN ]; then

  GH_PAGES_DIR=`pwd`/../reacc-gh-pages
  echo "machine github.com login reaccjs-bot password $GITHUB_TOKEN" >~/.netrc
  git config --global user.name "Circle CI"
  git config --global user.email "circle@reaccjs.org"

fi
