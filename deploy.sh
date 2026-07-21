#!/usr/bin/env sh
set -e
npm run build
echo '打包完成!'
cd ../
echo "请输入本次代码提交的描述信息："
read name 
echo "本次代码提交的描述信息是： $name"
git add .
git commit -m "$name"
git push origin master
echo '代码已更新!'
# cd -

