let express = require('express')
let socket = require('socket.io')

// app setup
let app = express()

// route setup
app.get('/', (res, req)=>{
    req.sendFile(__dirname + "/public/index.html")
})

// server setup 
let server = app.listen(4000, ()=>{
    console.log("Server is running on http://localhost:4000")
})

//socket setup
let io = socket(server)

io.on('connection', (socket)=>{
    socket.on('chat', (data)=>{
        io.sockets.emit('chat', data)
    })
    socket.on('typing', (name)=>{
        socket.broadcast.emit('typing', name)
    })
})