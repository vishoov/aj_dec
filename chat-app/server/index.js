import express from 'express';


const app = express();


// http handshake
import { createServer } from 'http';
const httpServer = createServer(app)
// this app is the instance that we need to secure 
// so for that we will create an http server that will only complete the handshake once the client is thoroughly verified

//cors 
import cors from 'cors'



//socket.io 
//socket -> client
// io -> server 

import { Server } from 'socket.io'
const io = new Server(
    httpServer, 
    //httphandshake, corsspecifications
    {
        cors:{
    origin:"*",
    method:['GET', 'POST']
}
    }
)



//document.addEventListener('eventType', ()=>{})
    //target element -> io -> instance for the server
    // on -> recieving event
    // we are recieving a connection in this 
    // connection event is a predefined or reserved event for recieving client connections
io.on('connection', (socket)=>{


    console.log(`socket with id ${socket.id} connected to the server`);

    //all the socket server goes here

    //joining a room
    socket.on('join_room', (roomName)=>{
        console.log(`socket with id ${socket.id} joined room: ${roomName}`)
        socket.join(roomName)
    })



    socket.on("message", ({message, reciever})=>{
        console.log(message, reciever)
        io.to(reciever).emit("forward", message)
        //.to method targets a specific socket id
        // whenevr we want to send a message to a specific client
        
        //io refers to the whole server 
    })

})





app.get("/", 
(req, res)=>{
    res.send("Welcome to the chat application ")
}
)



httpServer.listen(3000, ()=>{
    console.log("the server is live on http://localhost:3000/")
})