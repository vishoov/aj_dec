import User from "../model/user.model.js"


const users = async (req, res)=>{
    try{
        const users= await User.find();

        if(!users){
            res.status(404).json({
                message:"Users not found"
            })
        }

        res.status(200).json({
            message:"Users fetched",
            users
        })
    }
    catch(err){
        res.status(500).send(err.message)
    }
}

const signup = async (req, res)=>{
    try{
    const userData = req.body;

    console.log(userData)
    // const user = await User.insertOne(userData);
    // const user = await User.create(userData)
    
    const user = new User(userData); //this step implements the validation on the data
    await user.save(); //send the data to the db


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


const login = async (req, res)=>{
    try{
        //login = email and password 
        const { email, password } = req.body;
        //TDZ
        const user = await User.findOne({email:email}).select('+password')
        console.log(user)
        if(!user){
            res.status(404).json({
                message:"User not found"
            })
        }

        if(user.password!==password){
            res.status(400).json({
                message:"Password doesnt match"
            })
        }

        res.status(200).json({
            message:"Successfully logged in",
            user
        })

    }
    catch(err){
        res.status(400).send(err.message)
    }
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