---
title: Git常用命令及问题
date: 
tags:
- Git
---

> git  init      初始化
> git add .    添加到暂存
> git commit -m"注释"      添加到本地仓库
> git push     提交远程仓库
>
> 
>
> git branch -a      查看本地与远程的分支情况
> git checkout -b 分支     创建并切换到相应分支
> git branch -d/-D 分支名      删除本地分支
> git push  origin :远程分支     删除远程分支
>
> 
>
> git remote add origin 地址     添加远程联系地址
> git remote remove origin      删除远程联系地址
>
> 
>
> git clone 地址   克隆仓库代码
> git checkout -b 分支名  origin/远程分支名      创建并克隆远程分支代码
> git pull        拉取远程代码
> git fetch      更新本地仓库
> git merge 分支名     将分支名合并到当前分支
>
> 
>
> 冲突解决
>  冲突标志    (master | merging)  合并中
>  找出冲突代码  修改。git add .  git commit -m'..'   git push
>  不希望合并了：  git merge --abort  取消合并  回到合并前状态
>
>  万能解决方案：
>     重新克隆一份再修改提交
>
>  git reset --hard 版本号   回退到什么版本
>  git log --oneline    查看版本号
