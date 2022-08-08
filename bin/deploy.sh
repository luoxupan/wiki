rm -rf ../pages/webapp/*
mv ../WebApp/dist/* ../pages/webapp/
git add .
git commit -m"deploy"
git push
