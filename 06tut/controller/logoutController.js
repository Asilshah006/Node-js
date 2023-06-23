const userDB = {
    users : require('../model/users.json'),
    setUsers : function(data){ this.users = data}
}

const fspromises = require('fs').promises
const path = require('path')

const handleLogout = async (req,res)=>{
    const cookies = req.cookies
    if(!cookies?.jwt) return res.sendstatus(204)
    const refreshToken = cookies.jwt

    const foundUser = userDB.users.find(person =>{
        person.refreshToken === refreshToken
    })

    if(!foundUser){
        res.clearCookie('jwt' , {httpOnly : true })
       return res.sendstatus(204)
    }

    const otherUsers = userDB.users.filter(person => {
        person.refreshToken !== foundUser.refreshToken 
    })

    const currentUser = {...foundUser , refreshToken : ''}
    userDB.setUsers([...otherUsers , currentUser])

    await fspromises.writeFile(path.join(__dirname , '..' , 'model' , 'users.json') , JSON.stringify(userDB.users))

    res.clearCookie('jwt' , {httpOnly : true})
    res.sendstatus(204)
}
module.exports = handleLogout