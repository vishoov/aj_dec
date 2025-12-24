const handleSubmit = async (req, res)=>{
    try{
        //on signup form this function is hooked to the submit button 
        const response = await fetch("http://localhost:3000/v1/login", 
            {
                body:{formData}
            }
        )

        const data = await response.parse();
        const token = data.token;

        localStorage.setItem(token)

        //user info, token  
    }
    catch(err){
        throw new Error(err.message)
    }
}

// {
//     "message": "Successfully logged in",
//     "user": {
//         "_id": "694c0cde4a7c3e9060195e6f",
//         "username": "user12332233222",
//         "email": "admin@0.com",
//         "password": "Ahdhdhdhdhd123",
//         "role": "admin",
//         "createdAt": "2025-12-24T15:55:10.727Z",
//         "updatedAt": "2025-12-24T15:55:10.727Z",
//         "__v": 0
//     },
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NGMwY2RlNGE3YzNlOTA2MDE5NWU2ZiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc2NjU5MzQxOSwiZXhwIjoxNzc1MjMzNDE5LCJpc3MiOiJWaXNob28ncyBQcm9qZWN0In0.1V6CSFUKQowMBjbvwSuj57HvgnmYM43iiFLEhGX3TJI"
// }


const protectedRoute = async (req, res)=>{
    try{
        //on signup form this function is hooked to the submit button 
        const response = await fetch("http://localhost:3000/v1/login", 
            {
                body:{formData},
                headers:{
                    Authorization: `Bearer ${localStorage.token}`
                }
            }
        )

        const data = await response.parse();
        const token = data.token;

        localStorage.setItem('token', token)

        //user info, token  
    }
    catch(err){
        throw new Error(err.message)
    }
}
