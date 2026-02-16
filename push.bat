git add .

$msg = Read-Host "Message du commit"

git commit -m "$msg"

git push

Pause
