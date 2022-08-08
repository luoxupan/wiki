#!/bin/bash

git checkout gh-pages
branch=$(git symbolic-ref --short -q HEAD)
if [ $branch = "gh-pages" ]
then
  rm -rf ../pages/webapp/*
  mv ../WebApp/dist/* ../pages/webapp/

  git add .
  git commit -m"deploy"
  git push
else
  echo 当前分支不是gh-pages
fi


