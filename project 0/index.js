import express, { request } from 'express';
//es6+ syntax

const app = express();
//create an instance of the express application (server)





//define a route 
// http://localhost:3000/home GET respond with a text of "Welcome to home route"

// document.addEventListener('event-name', CB Func)
// app.method('/route', handlerFunction)
app.get('/home', (req, res)=>{
    //req -> whatever data or info we have recieved in the request
    //res-> whatever data WE SEND BACK to the CLIENT
    res.send("Welcome to the home page")
})

//middleware 
app.use(express.json())
app.get("/request", (req, res)=>{
        const requestbody = req.body;
        const requestHeaders = req.headers;
        
        res.send({requestbody, requestHeaders})
})

app.get('/request_methods', (req, res)=>{
    const ip = req.ip; //prints the ip address of the client from where we have recieved the request
    const route = req.route; //on which route we have recieved the request
    const protocol = req.protocol; //using which protocol we have recieved this request 
    const hostname = req.hostname; 
    const method = req.method;
    const reqUrl = req.path; 


    console.log({
        ip,
        route,
        protocol,
        hostname,
        method,
        reqUrl
    })

    res.send("request-methods route is working")
})


//Dynamic Routing -> we can send variables inside the routes

// Route parameters 
app.get("/params/:name", (req, res)=>{
    const name = req.params.name;
    console.log(name)
    res.send(`welcome to the route, ${name}`)
})

//multiple parameters
//name/tom/age/45
app.get("/name/:name-:age", (req, res)=>{
    const name = req.params.name;
    const age = req.params.age;

    res.send(`Welcome to server, ${name}, you age is ${age}`)
})

// we can use hyphens(-) and dots (.) between multiple params as well

// Query Parameters 
app.get("/query", (req, res)=>{

    const query = req.query.q;

    res.send(`your query is : ${query}`)
})

//ROUT= http://localhost:3000/query?q=searchQuery 
// RESPONSE= your query is : searchQuery

// app.get('/multiple', (req, res)=>{
//     res.send("this is the get route")
// })

// app.post('/multiple', (req, res)=>{
//     res.send("this is the post route")
// })

app.all('/multiple', (req, res)=>{
    res.send('this is the all route')
})





//port listener 
//amazon-backend.com/signup 
// document.addEventListener('event-name', CB Func)
app.listen(3000, ()=>{
    console.log("server successfully live on http://localhost:3000/")
})