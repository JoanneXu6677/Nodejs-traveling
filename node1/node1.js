"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
// async function main() {
//     // Generate test SMTP service account from ethereal.email
//     // Only needed if you don't have a real mail account for testing
//     let testAccount = await nodemailer.createTestAccount();

// create reusable transporter object using the default SMTP transport
// 创建发送邮件请求对象
let transporter = nodemailer.createTransport({
    host: "smtp.qq.com", //主机 发送方邮箱
    port: 465, //端口号
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'xmj6677@qq.com', // generated ethereal user 发送方邮箱地址
        pass: 'xestbkqwbohqbaid' // generated ethereal password    mtp验证码
    }
});

// send mail with defined transport object
//邮件信息
//验证码6位
var Num = Math.floor(Math.random() * 999999);
console.log("验证码", Num)
let mailObj = {
    from: '"Fred Foo 👻" <xmj6677@qq.com>', // sender address
    to: "xmj6677@qq.com", // list of receivers 发给谁
    subject: "Hello ✔", // Subject line 标题
    text: "您的验证码是" + Num + "，有效期五分钟", // plain text body 文本信息 只能输字符串
    //html: "<b>Hello world?</b>" // html body 页面  文本和页面只能有一个
}
//发送邮件
transporter.sendMail(mailObj, (err, data) => {
    if (err == null) {
        console.log("发送成功"); //异步操作 发送成功后err为null 以此判断是否发送成功
        console.log(data);
    } else {
        console.log(err); //输出失败信息
        console.log(data);
    }

})

//邮箱轰炸器
// setInterval(() => {
//     transporter.sendMail(mailObj)
// }, 5000)

// console.log("Message sent: %s", info.messageId);
// // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

// // Preview only available when sending through an Ethereal account
// console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
// // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...


// main().catch(console.error);