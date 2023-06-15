
 const fs = require('fs')
// const fspromises = require('fs').promises
const path = require('path')

// const fileops = async () =>{
//     try{
//     const data = await fspromises.readFile(path.join(__dirname , './files' , 'starter.txt') , 'utf8')
//     await fspromises.unlink(path.join(__dirname , './files' , 'starter.txt'))
//     await fspromises.writeFile(path.join(__dirname , './files' , 'promise.txt') , data)
//     console.log('writing..');
    
//     await fspromises.appendFile(path.join(__dirname , './files' , 'promise.txt') , '\n\n Nice to meet you!' )
//     console.log('Appending..');
   
//     await fspromises.rename(path.join(__dirname , './files' , 'promise.txt') , path.join(__dirname , './files' , 'promise_Complete.txt') )
//     console.log('Renaming..');

//     }catch(err){
//         console.log(err);
//     }
// }

// fileops();


// fs.readFile('./files/starter.txt', 'utf8', (err, data) =>{
//     if(err) throw err

//     console.log(data);
// })

// process.on('uncaughtException' , err =>{
//     console.error(`There was an uncaught exception : ${err}`)
//     process.exit(1)
// })

// console.log('Hello');

// fs.writeFile('./files/reply.txt', 'Nice to meet you !', (err) =>{
//     if(err) throw err

//     console.log('writing complete');

//     fs.appendFile(path.join(__dirname , 'files' , 'reply.txt'), '\n\n Yes it is', (err) =>{
//         if(err) throw err
    
//         console.log('Append complete');
//     })
//     fs.rename(path.join(__dirname , 'files' , 'reply.txt'), path.join(__dirname , 'files' , 'newReply.txt'), (err) =>{
//         if(err) throw err
    
//         console.log('Rename complete');
//     })
    
// })

// const rs = fs.createReadStream('./files/lorem.txt', {encoding : 'utf8'})

// const ws = fs.createWriteStream('./files/writeStream.txt')

// rs.on('data' , (datachunk) =>{
//     ws.write(datachunk)
// })

// // rs.pipe(ws)

if(!fs.existsSync('./new')){
    fs.mkdir('./new' , (err)=>{
        if(err) throw err
        console.log('New Directory');
    });
}t

if(fs.existsSync('./new')){
    fs.rmdir('./new' , (err)=>{
        if(err) throw err
        console.log('REmove Directory');
    });
}