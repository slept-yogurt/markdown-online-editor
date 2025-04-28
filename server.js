const express = require('express')
const path = require('path')
const os = require('os')

const app = express()
const PORT = 8866

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'dist')))

// 所有路由都返回 index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

// 启动服务器
app.listen(PORT, '0.0.0.0', () => {
  const networkInterfaces = os.networkInterfaces()
  let localIP = 'localhost'

  // 获取本地IP地址
  Object.keys(networkInterfaces).forEach((interfaceName) => {
    networkInterfaces[interfaceName].forEach((interface) => {
      if (interface.family === 'IPv4' && !interface.internal) {
        localIP = interface.address
      }
    })
  })

  console.log(`服务器已启动！`)
  console.log(`本地访问地址: http://localhost:${PORT}`)
  console.log(`局域网访问地址: http://${localIP}:${PORT}`)
  console.log(`\n请手动打开浏览器访问以上地址`)
})
