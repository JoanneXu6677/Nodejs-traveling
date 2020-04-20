const http = require('http')
const fs = require('fs')
const cheerio = require('cheerio')

var request = require('request')

let url = 'http://www.baidu.com/'
http.get(url, (res) => {

    //安全处理

    const {
        statusCode
    } = res; //es6状态赋值 res对象中的statusCode 赋给变量statusCode
    // const contentType = res.headers['content-type']; //文件类型

    let error;
    if (statusCode !== 200) {
        error = new Error('请求失败\n' +
            `状态码: ${statusCode}`);
    } // else if (!/^application\/json/.test(contentType)) {
    //     error = new Error('无效的 content-type.\n' +
    //         `期望的是 application/json 但接收到的是 ${contentType}`);
    // }
    //上面两判断有一个出错
    if (error) {
        console.error(error.message);
        // 消费响应数据来释放内存。
        res.resume(); //重置缓存
        return;
    }

    //数据处理
    let rawData = '';
    res.on('data', (chunk) => {
        console.log('----')
        //字符串拼接
        rawData += chunk.toString('utf8');
    });
    res.on('end', () => {
        //将请求数据保存到文件
        console.log("数据传输完毕")
        // fs.writeFileSync('./example.html', rawData)
        let $ = cheerio.load(rawData) //将请求的网页数据进行转化
        $('img').each((index, el) => {
            //下载图片
            var imgPath = $(el).attr('src');
            console.log(imgPath)
            console.log(imgPath.substr(0, 4))
            if (imgPath.substr(0, 4) == 'http') {
                downloadPic(imgPath, './' + index + '.gif');
            } else {
                downloadPic('http:' + imgPath, './' + index + '.gif');
            }

        })

    });
}).on('error', (e) => {
    console.error(`出现错误: ${e.message}`);
});

var downloadPic = function (src, dest) {
    request(src).pipe(fs.createWriteStream(dest)).on('close', function () {
        console.log('pic saved!')
    })
}