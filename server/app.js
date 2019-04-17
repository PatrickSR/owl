const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')

const indexRouter = require('./routes/index')

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

const FUNCTIONTYPE = '[object Function]'
function type(obj) {
  return Object.prototype.toString.call(obj)
}

app.use(cors({
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}))
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))



app.use(function(req, res, next){
  res.io = io
  res.nspList = nspList
  next()
})

app.use('/', indexRouter)

io.on('connection', function(socket){
  const token = socket.handshake.query.token
  socket.to(token)
    .on('request', (payload, ack) => {
      console.log(`收到信息${payload}`)
      socket.broadcast.emit('notification', payload)
      
      if(ack && type(ack) == FUNCTIONTYPE){
        ack('server 收到信息')
      }
    })
  .emit('notification', '连接成功')
})

module.exports = {
  app,
  server
}
