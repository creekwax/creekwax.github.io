---
title: Hexo博客搭建及个性化主题
date: 2016-12-26
category:
- 博客
description: 基于Hexo搭建的静态博客平台，并为其配置自定义的主题。
---



如何快速地搭建起博客写作平台，记录生活中的点滴？拥抱MD，拥抱静态博客文件生成与托管方式吧！本文记录了使用Hexo引擎的博客平台的搭建过程，以及本博客使用的自定义主题开发的相关内容。



## 搭建博客

[Hexo](https://hexo.io)作为静态博客生成的优势是简单易用，循着官网上的流程，可以快速搭建起自己的博客平台。通过编写符合markdown语法的文件，Hexo中以及社区贡献的JavaScript插件可以将它们解析成HTML静态文件提供访问。

使用`hexo init`之后，会将一个最基础的博客`hexo-starter`克隆到本地目录。其中的`package.json`中展示了使用的一些基本插件：

```bash
"dependencies": {
    "hexo": "^3.7.0",
    "hexo-generator-archive": "^0.1.5",
    "hexo-generator-category": "^0.1.3",
    "hexo-generator-index": "^0.2.1",
    "hexo-generator-tag": "^0.2.0",	# 博客内容组织相关插件
    "hexo-renderer-ejs": "^0.3.1",	# 解析博客主题中的ejs文件
    "hexo-renderer-stylus": "^0.3.3",	# 解析博客主题中的stylus语法的css文件
    "hexo-renderer-marked": "^0.3.2",	# markdown文件转换插件
    "hexo-server": "^0.3.1"		# 支持本地serve博客的插件
}
```

`node_modules`中有这些插件的源码，如果有需要可以直接去更改源码实现功能，或者fork出来修改之后提交自己的插件。使用`hexo-renderer-marked`时会将markdown文件的数学公式中下标`_`符号错误地解析为`<em>`标签。在本博客使用Latex时的解决方式是，对其中的解析为`<em>`的正则表达式修改去除下划线。今昔不比往日，现在本博客使用[KaTex](https://katex.org)来解析展示页面中的数学公式，所以把`hexo-renderer-marked`更换为`hexo-renderer-markdown-it-plus`，部署及配置可以参见插件的Github[项目主页](https://github.com/CHENXCHEN/hexo-renderer-markdown-it-plus)。

在使用过程中，很容易看到Hexo的最大不足是其文档不够翔实。其它三方开发的插件一般会在自己的主页写好使用方式，但是官方提供的插件如`hexo-generator-*`则是没有单独的文档介绍，因此博客的配置也不清不楚，定制起来比较费时。两个解决方法，使用他人的成品，或者慢慢摸索对比学习。



## 自定义主题 - Oitsi

初衷其实很简单，还是想要让这个博客看起来简洁而又不单调。起初是找了一些现成的，很流行也还不错的主题来尝试。最开始在[maupassant-hexo](https://github.com/tufu9441/maupassant-hexo)的基础上做了一些修改，去掉了很多插件，也改了一些页面的布局。整体感觉还挺满意的，最重要的收获是在折腾这个主题的过程中，学习到了Hexo主题的一般构成。中间有一段时间没有什么文章产出，也对这个主题有点审美疲劳了，就体验了另一个更简单的主题[Aloha](https://github.com/henryhuang/hexo-theme-aloha)。总的来说，对功能上的个人需求还得自己写代码来解决。刚好最近看到了[Istio](https://istio.io/blog)这个布局，看起来很简单，又能够比较清晰地展示内容，于是就决定参考定制一个镜像主题。本主题的名字也取了它的一个镜像 :)

从零开始看官方文档，真的没什么用处，比对着一个主题的代码来看要了解地快很多。之前对maupassant有一点定制的经验，配合一些主题教程，用上基本的HTML+CSS技术，整个开发过程还算是顺利。时间最多是被耗费在使用Bootstrap进行页面布局和写CSS文件上了。整个主题的结构：

```bash
.
|-- _config.yml
|-- README.md
|-- languages		# 常量的中英文对照
|   `-- zh-CN.yml
|-- layout
|   |-- _partial	# 页面布局中通用的区域
|   |-- _widget		# 页面中实现特定功能的区域
|   |-- archive.ejs	# 归档页
|   |-- index.ejs	# 博客首页
|   |-- layout.ejs	# 所有页面的基本布局
|   |-- post.ejs	# 文章详情页
|   `-- single.ejs	# 单独页面，用于“关于”页
`-- source		# 会被直接拷贝到生成网站根目录下
    |-- avatar.jpg
    |-- css
    |-- favicon.ico
    `-- js

```

使用这个主题还有对博客以及主题的配置文件`_config.yml`有依赖。第一版主题里，还有一些侧边栏的卡片区域的定制，在逐渐完善的过程中也将这些卡片去掉了，毕竟内容才是最重要的。



### 页面布局相关

上一节中提到了主题中使用的把 markdown 文件转成 HTML 的插件不是用的默认插件，所以首先得将新插件的配置扔到文件中。同时，使用了`highlight.js`做代码的高亮，所以基本配置中修改`highlight: enable: false`。所有的页面都没有使用到分页功能，配置`per_page: 0`可禁用分页：

```yaml
per_page: 0	        # 首页不分页
category_generator:
	per_page: 0
tag_generator:
	per_page: 0
archive_generator:	 # 归档页不分页，且没有按照年份或月份进行组织
	per_page: 0
	yearly: false
	monthly: false
```



### 页面内容相关

博客顶栏中的导航菜单涉及到页面文件的路径，如果要进一步修改需要对其中的内容进行配置：

```yaml
menu:
	- page: Blog
	  directory: ./
	- page: Archive
	  directory: archives/
	- page: About
	  directory: about/
```

在`oitsi.js`文件中，使用了Google Analytics进行页面访问统计，其中包含了特有的UA。其中的JavaScript代码也可以对代码高亮的风格进行调整，如行号、缩进。



## 最后

文章介绍地比较简略，事实上整个过程耗费的时间长到离谱。总的来说，自己写一个主题的学习成本还挺大的，但是熟悉了套路之后实际开发起来并不需要特别耗时地写代码。重点在于，从零开始开发出自己的主题之后，有动力实现更多的功能去完善它，或者去根据需求修改它。当前主题比较严重的不足有以下几方面：

1. 响应式布局。虽然使用的是Bootstrap，但是我自己对于其支持的响应式布局掌握不够，所以还没有实现。
2. 博客图片压缩。希望在上传到服务器上时，文章中使用的图片都能够被压缩之后再上传，节省空间和带宽。

同时，博客的搜索、评论等功能也值得支持，后续如果补坑的话，可能会有与本文统一类别下的更多文章。在主题开发过程中，除了Istio网站的整体风格产生的主要影响之外，这个[博客系列](http://www.codeblocq.com/2016/03/Create-an-Hexo-Theme-Part-1-Index/)对我的帮助也很大，同时上文中提到的两个主题的代码也启发了部分设计与实现。