import User from "../model/user.model.js"


const users = (req, res)=>{
    res.send("Welcome to the users route")
}

const signup = async (req, res)=>{
    try{
    const userData = req.body;

    console.log(userData)
    const user = await User.insertOne(userData);
    console.log(user)
    res.json({
        message:"User created successfully",
        user
    })
}
catch(err){
    res.send(err.message)
}
}


const login = (req, res)=>{
    res.send("welcome to login page")
}


const reset = (req, res)=>{
    res.send("welcome to reset page")
}

const logout = (req, res)=>{
    res.send("welcome to logout page")
}

const singleUser = (req, res)=>{
    const id = req.params.id;

    res.send(`welcome to the user's profile with id: ${id}`)
}



export {
    users,
    signup,
    logout,
    reset,
    login,
    singleUser
}