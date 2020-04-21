# Nodejs-traveling
Nodejs demo

## node1 中有我练习时所写的简单爬虫，以及nodemailer简单使用
+ 因为环境一样我就放在了一起

### splider.js 爬虫
   1.获取目标网站 http模块 http.get
   2.分析网站内容  cheerio 通过它可以使用jquery里的选择器
   3.获取有效信息 下载或者其他操作
   - 爬下来的是一堆字符串 用正则表达式匹配 或者用cheerio选择
   - demo：将爬到的图片链接下载下来

### node1.js 邮箱相关
+ nodemailer 可以实现发邮件 发送验证码 六位随机
+ 过程
  - npm init --yes 创建一个工程
  - npm install nodemailer
  - 在官方文档中有模板可参考写上
  - 在环境包里lib库well-known中 services.js找邮箱端口号 此次用qq邮箱当做服务端邮箱 在qq邮箱中申请
+ 邮箱轰炸机 不可滥用
