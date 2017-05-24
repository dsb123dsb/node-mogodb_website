# node-mogodb_website
基于pug(bootstrap)+node.js_MongoDB数据库，实现前后端的链接，实现电影的增删改查

慕课网 - Node.js+MongoDB建站攻略（一期）参考源码

此程序基于慕课网Scott老师的Node.js+MongoDB建站攻略（第一期）视频教程编写，当前所有模块程序均为最新版本，截止2017年5月，代码中包含详细的注释，非常适合初学者。

★★超详细使用流程★★

# 安装Node.js #

具体的安装方法请自行百度，多找几篇博客文章熟悉后再尝试，适用于对Node.js有一定了解的同学
## 安装MongoDB，方法自行百度，建议先在网上看看视频教程 ##

1.  把MongoDB安装路径下的bin文件目录，例如："C:\Develop\MongoDB\Server\3.4\bin"添加到系统环境变量，便可在命令窗口直接执行bin文件里面的命令；
2. 设置MongoDB数据库的数据存储路径，建议在C盘下创建C:/data/db目录文件夹，这是默认的数据存储路径，但需要手动创建，这样的话第3步的命令：mongod可直接执行；

##  启动MongoDB服务：mongod ##

1. 在命令窗口[cmd]执行命令：mongod，开启MongoDB服务，启动后请勿关闭窗口;
2. 再新开一个命令窗口[cmd]执行命令：mongo，就可以用命令来管理数据库，例如：数据的增删改查；

## 安装bower依赖：bower install ##

在项目文件夹下，按住shift键的同时按下鼠标右键，选择在此处打开命令窗口，执行命令：bower install；

## 安装npm依赖：npm install ##

在项目文件夹下，按住shift键的同时按下鼠标右键，选择在此处打开命令窗口，执行命令：npm install；

## 启动项目入口文件：node app.js ##

在项目文件夹下，按住shift键的同时按下鼠标右键，选择在此处打开命令窗口，执行命令：node app；

## 浏览器查看效果 ##

1. http://localhost:3000查看首页效果。
2. http://localhost:3000/admin/list列表页
3. http://localhost:3000/admin/movie后台录入页
