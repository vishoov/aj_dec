import express from 'express';
//es6+ syntax

const app = express();
//create an instance of the express application (server)


//LOGGING MIDDLEWARE
const loggingMiddleware = (req, res, next)=>{
    const url = req.url;
    const method = req.method;
    const time = new Date().toLocaleTimeString();
    const ip = req.ip

    console.log(`${url}: ${method} at ${time} from ${ip}`)
    next()

}


import routes from './routes.js'

import morgan from 'morgan';

app.use(morgan('dev'))


app.use(routes)


app.use(loggingMiddleware)

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


// Response Object

app.get("/response", (req, res)=>{
    //plain text res.send("Hello world")
    //HTML response res.send("<h1 style='color:white; background-color:blue'>Title</h1><br><p>This is the html sent from the route")
    //object
    // res.send({ message:"Hello world", data:{name:"ABC",   age:999 }})

    // res.status(201).send("Data")

    // res.json({
    //     message:"Success",
    //     data: "users"
    // })

    res.redirect('/multiple')


})

app.get("/", (req, res)=>{
    res.send("Welcome to the ROOT ROUTE")
})


app.set('view engine', 'ejs')
app.get('/users', (req, res) => {
    const users = [
      { id: 1, name: 'Alice', email: 'alice@example.com' },
      { id: 2, name: 'Bob', email: 'bob@example.com' },
      { id: 3, name: 'Charlie', email: 'charlie@example.com' }
    ];
    // users.ejs -> template

    //res.render is used for rendering embedded templates 
    res.render('users', { 
      title: 'User List',
      users: users
    });
  });



app.get("/sendFile", (req, res) => {
    res.sendFile('index.html', {
        root: import.meta.dirname
    })
});



// Middlewares Example
// 1. Middleware has access to the request response objects
// 2. next keyword = whenever this next() keyword is called inside the middleware, it marks its completion
const middleware1 = (req, res, next)=>{
    console.log("middleware reached")
    next()
}


const mw2 = (req, res, next)=>{
    console.log("Middleware 2 reached")
    next()
}

//app.use method allowes us to implement any function before ALL the FOLLOWING ROUTES
app.use(
    middleware1
)

app.get('/middlewareEnabled', mw2, (req, res)=>{
    console.log("Handler function executed")
    res.send("Handler Function Executed")
})

app.get('/mw2', (req, res)=>{
    res.send("Middleware 2 route handler reached")
})










// port listener always comes in the end of the index file 
//port listener 
//amazon-backend.com/signup 
// document.addEventListener('event-name', CB Func)
app.listen(3000, ()=>{
    console.log("server successfully live on http://localhost:3000/")
})