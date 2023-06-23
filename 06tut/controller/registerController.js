const userDB = {
    users : require('../model/users.json'),
    setUsers : function(data){ this.users = data}
}

const fspromises = require('fs').promises
const path = require('path')
const bcrypt = require('bcrypt')

const handleNewUser = async (req,res)=>{
    const {user, pwd} = req.body

    if(!user || !pwd) return res.status(401).json({"message" : "username or password required" })

    const duplicate = userDB.users.find(person =>{ person.username === user})
    if(duplicate){
       return res.sendStatus(409)
    }

    try{
        const hashpwd = await bcrypt.hash(pwd , 10)
        const newUser = {"username" : user , "password" : hashpwd}
        userDB.setUsers([...userDB.users , newUser])
        
        await fspromises.writeFile(path.join(__dirname, '..' , 'model' , 'users.json') , JSON.stringify(userDB.users))

        console.log(userDB.users);
        res.status(201).json({"message" : `New User ${user} created`})

    }catch(err){
        res.status(500).json({"message" : err.message})
    }
}

module.exports = handleNewUser