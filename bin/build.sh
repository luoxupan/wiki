#!/bin/bash

git pull
git branch -D gh-pages
git checkout gh-pages
git merge master

cd ../WebApp && npm ci
cd ../WebApp && npm run build
