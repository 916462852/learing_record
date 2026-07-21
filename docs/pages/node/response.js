/**
 * 使用node 返回一个 文件
 */

const http = require('node:http')

const fs = require('node:fs')

const html = fs.readFileSync('./说说你对node理解.md')

const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", 'text/html; charset=utf-8')
    fs.createReadStream('./说说你对node理解.md').pipe(res)
})

server.listen(3000, () => {
    console.log('listen30000')
})