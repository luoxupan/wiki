#!/bin/bash

git checkout gh-pages
git pull
git merge master --allow-unrelated-histories

cd ./WebApp
npm ci
npm run build
