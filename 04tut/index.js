const logEvents = require("./logEvents");
const http = require('http')
const fs = require('fs')
const fspromises = require('fs').promises
const path =require('path')

const EventEmitter = require('events')

class Emitter extends EventEmitter{}
const emitter = new Emitter()
emitter.on('log' , (msg , filename) => logEvents(msg , filename))
const PORT = process.env.PORT || 3500;

const serverFile = async (filePath , contentType , response)=>{
    try{
      
        const rawData = await fspromises.readFile(filePath, 'utf8')
        const data = contentType === 'application/json' ? JSON.parse(rawData) : rawData
        response.writeHead( 
            filePath.includes('404.html') ? 404 : 200,
            {'Content-Type' : contentType})
        response.end(
            contentType === 'application/json' ? JSON.stringify(data) : data
        )

    }catch(err){
        console.log(err);
        response.statusCode = 500
        response.end()
        emitter.emit('log' , `${err.name} : ${err.message}` , 'errlogs.txt')
    }
}

const server = http.createServer( (req , res) =>{
    console.log(req.url , req.method);
    emitter.emit('log' , `${req.url}\t ${req.method}` , 'reqlogs.txt')
    const extention = path.extname(req.url)

    let contentType;

    switch(extention){
        case '.css':
            contentType = 'text/css'
            break;
        case '.js':
            contentType = 'text/javascript'
            break;
        case '.txt':
            contentType = 'text/plain'
            break;
        case '.json':
            contentType = 'application/json'
            break;
        case '.jpg':
            contentType = 'image/jpeg'
            break;
        case '.png':
            contentType = 'image/png'
            break;
        default : 
            contentType = 'text/html'
            
    }

    let filePath = 
        contentType === 'text/html' && req.url === '/'
            ? path.join(__dirname, 'views', 'index.html')
                : contentType === 'text/html' && req.url.slice(-1) === '/'
                    ? path.join(__dirname, 'views', req.url,'index.html' )
                    :contentType === 'text/html'
                    ? path.join(__dirname , 'views' , req.url)
                    : path.join(__dirname , req.url)

    if(!extention && req.url.slice(-1) !== '/') filePath += '.html'

    const fileExists = fs.existsSync(filePath)
    
    if(fileExists){
        serverFile(filePath, contentType, res)
    }else{
        switch(path.parse(filePath).base){
            case 'old-page.html':
                res.writeHead(301, {'Location' : '/new-page.html'})
                res.end()
                break;

            case 'www-page.html':
                res.writeHead(301, {'Location' : '/new-page.html'})
                res.end()
                break;
            
            default:
                serverFile(path.join(__dirname, 'views' , '404.html'), 'text/html', res)

        }
    }

})

server.listen(PORT, () =>{ 
    console.log(`server running on Port ${PORT}`);
})

