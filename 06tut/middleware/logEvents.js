const {format} = require('date-fns')
const {v4 : uuid} = require('uuid')
const path = require('path')
const fs = require('fs')
const fspromises = require('fs').promises

const logEvents = async (msg , logname) =>{
    const datetime = format(new Date() , 'dd/MM/yyyy/HH:mm:ss' )
    const logItems = (`${datetime}\t ${uuid()}\t ${msg} \n`)
    console.log(logItems);

    try{
        if(!fs.existsSync(path.join(__dirname , '..' , 'logs'))){
            await fspromises.mkdir(path.join(__dirname , '..' , 'logs'))
        }

        await fspromises.appendFile(path.join(__dirname , '..' , 'logs', logname), logItems)

    }catch(err){
        console.log(err);
    }

}


const logger = (req , res, next) =>{
    console.log(`${req.method} ${req.path}`);
    logEvents(`${req.method}\t ${req.headers.origin}\t ${req.path}` , 'reqlogs.txt')
    next();
}
module.exports = {logger, logEvents}