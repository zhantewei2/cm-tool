# serve tool
一款`nice`的前端静态文件托管服务器，命令行工具
> 未找到文件，默认指向，已配置托管根目录的 `index.html` 文件。


 Install
 ---
```
npm install -g @ztwx/cm-cli
```
or
```
yarn global add @ztwx/cm-cli
```


Command
--- 
- -h --help
- start `<service name>` 指定服务名，并启动服务
    - -h,`--help` 帮助
    - -d,`--dir`  当前文件夹名路径，或绝对文件夹路径
    - -u,`--url`  托管的url path。 默认为`/`。
    - -g,`--gzipFile` 开启gzip托管，服务器不进行gzip压缩，只负责gzip头信息的管理。默认为`false`。可设置为`js,css,html`,即对该后缀名的文件，添加`Content-Encoding:gzip`。
    - -p,`--port`  服务器端口设置,默认为 `3000`
    - -m,`--maxAge` Cache-Control 缓存时间，默认为86400
- stop `<service name>` 停止服务
- list  显示目前托管的服务列表
> 建议使用`cmServe`自带的服务管理。 用以开启和关闭服务。


Example
---

> 菜鸟版详细说明

#### 一，普通托管

如当前**shell**路径下有`my-service-directory`这个文件夹，
- 这是需要托管的前端静态文件夹。
- `my-service-directory/index.html`位置， 存在`index.html`文件。 `index.html`其实可以不存在，但一般你需要明确，目录下有`index.html`的文件夹，才是前端托管文件夹。
```
cmServe start myService -d my-service-directory
```
or 指定绝对路径
```
cmServe start myService -d /home/frontend-static/my-service-direcory
```


#### 二，gzip 托管

一般基于**cm**的项目工程，`build`后，会对生成文件，再进行gzip压缩，但只对`js`,`css`,`html`三类文件进行 `gzip`压缩。
所以针对该压缩文件，应该如下配置：

```
cmServe start myService -d my-service-directory -g js,css,html
```

#### 三，url路径配置

**cmServe** 默认项目前置url为`/`,你也可以更换为你需要的。
```
cmServe start myService -d my-service-directory -u /mypath
```
一般前置url需要与你项目文件`index.html`内的`<base href="${value}">` 的value值相匹配。

当然这最终取决你项目的网关配置。