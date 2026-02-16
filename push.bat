@echo off

git add .

set /p msg=Message du commit : 

git commit -m "%msg%"

git push

pause
