#!/bin/bash

git checkout gh-pages
branch=$(git symbolic-ref --short -q HEAD)
if [ $branch = "gh-pages" ]
then
  rm -rf ./pages/webapp/*
  mv ./WebApp/dist/* ./pages/webapp/

  git config --global user.email "ygxqqx@163.com"
  git config --global user.name "luoxupan"

  git add .
  git commit -m"deploy"
  git push
else
  echo 当前分支不是gh-pages
fi
