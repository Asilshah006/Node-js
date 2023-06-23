const userDB = {
    users : require('../model/users.json'),
    setUsers : function(data){ this.users = data}
}

const fspromises = require('fs').promises
const path = require('path')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { log } = require('console')
require('dotenv').config


const handleLogin = async (req,res)=>{
    const {user, pwd} = req.body

    if(!user || !pwd) return res.status(401).json({"message" : "username or password required" })

    const foundUser = userDB.users.find(person =>{
        person.username === user
    })

    if(!foundUser){
        res.status(401).json({"message" : "User Not Found"})
    }

    const match = await bcrypt.compare( pwd ,foundUser.password)
    if(match){

        const AccessToken = jwt.sign(
            {"username" : foundUser.username},
            process.env.ACCESS_TOKEN_SECRET , 
            {expiresIn : '30s'}
        )
        const RefreshToken = jwt.sign(
            {"username" : foundUser.username},
            process.env.REFRESH_TOKEN_SECRET , 
            {expiresIn : '1d'}
        )

        const otherusers = userDB.users.filter(person => person.username !== foundUser.username)
        const currentuser = {...foundUser , RefreshToken}
        userDB.setUsers([...otherusers , currentuser])
        
        res.cookie('jwt', RefreshToken, {"httpOnly" : true , maxAge : 24*60*60*1000 });

        await fspromises.writeFile(path.join(__dirname, '..' , 'model' , 'users.json'), JSON.stringify(userDB.users))
        console.log(userDB.users);
        

        res.status(201).json({AccessToken})
    }else{
        res.status(401).json({"message" : "Invalid User Or Password"})
    }

}

module.exports = handleLogin