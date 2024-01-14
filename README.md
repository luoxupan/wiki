
## Page链接：
- [WebApp](https://luoxupan.github.io/wiki/pages/webapp/index.html)
- [异步按需加载](https://luoxupan.github.io/wiki/pages/page02/index.html)
- [react hooks 快照例子](https://luoxupan.github.io/wiki/pages/page05/index.html)
- [history.pushState例子](https://luoxupan.github.io/wiki/pages/page06/index.html)
- [vue动态render例子](https://luoxupan.github.io/wiki/pages/vue-render/index.html)

---

- [utils工具库开发和npm发布方案脚手架](https://github.com/luoxupan/wiki/tree/master/scaffolding/utils)
- [react ts 脚手架模板](https://github.com/luoxupan/wiki/tree/master/scaffolding/ts-template)

---

## VPS网址
- 飞讯
  - https://www.feixun.co 最新网址
  - https://meikimi.github.io  永久网址
- 搬瓦工
  - https://bwg.wiki

---

### Mac启动自带服务器实现本地访问
- `sudo apachectl start`
- `sudo apachectl restart`
- `sudo apachectl stop`
- 修改服务器默认配置
  - `sudo vim /etc/apache2/httpd.conf`
  - 将`<Directory "/Library/WebServer/Documents">`修改成`<Directory "/Users/luoxupan">`
- 浏览器输入`http://localhost/wiki/pages/page06/index.html`

---

### Mac启动Nginx服务器实现本地访问
- `nginx -t` 查看`nginx.conf`配置文件路径
- 修改`nginx.conf`资源根路径
  ```
  location / {
    root /Users/luoxupan;
    index  index.html index.htm;
  }
  ```

---

![image](https://luoxupan.github.io/wiki/image/HTML_CSS_01.jpeg)
---
![image](https://luoxupan.github.io/wiki/image/Javascript_01.jpeg)
---
![image](https://luoxupan.github.io/wiki/image/algorithms_01.jpeg)

