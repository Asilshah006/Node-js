const {format} = require('date-fns')
const {v4 : uuid} = require('uuid')

const fs = require('fs')
const fsPromise = require('fs').promises
const path = require('path')

// console.log(format(new Date() , 'ddMMyyyy\tHH:mm:ss'));
// console.log(uuid());

const logEvents = async (msg , logname) =>{
    const datetime = `${format(new Date() , 'ddMMyyyy\tHH:mm:ss')}`
    const logItems = `${datetime}\t ${uuid()}\t ${msg} \n`
    console.log(logItems); 
    try{
        if(!fs.existsSync(path.join(__dirname , 'logs'))){
            await fsPromise.mkdir(path.join(__dirname, 'logs'))
        }

        await fsPromise.appendFile(path.join(__dirname , 'logs' , logname) , logItems)

    }catch(err){
        console.log(err);
    }
}

module.exports = logEvents;
