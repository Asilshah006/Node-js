const http = require('http')
const path = require('path')
const fs = require('fs')
const fspromises = require('fs').promises
const {logger} = require('./middleware/logEvents')
const express = require('express')
const app = express()
const cors = require('cors')
const errorHandler = require('./middleware/errorHandler')

const PORT = process.env.PORT || 3500

app.use(logger)

const whiteList = ['https://www.google.com' , 'http://127.0.0.1:5500', 'http://localhost:3500']

const corsOption = {
    origin : (origin, callback)=>{
        if(whiteList.indexOf(origin) !== -1 || !origin){
            callback(null, true)
        }else{
            callback(new Error('Not Allowed By Cors'))
        }
    },
    optionsSuccessStatus : 200
}

app.use(cors(corsOption))


app.use(express.urlencoded({extended : false}))

app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')))

app.get('^/$|/index(.html)?', (req, res)=>{
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.get('/new-page(.html)?', (req,res)=>{
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'))
})

app.get('/old-page(.html)?', (req,res)=>{
    res.redirect(301 , path.join(__dirname, 'views', 'new-page.html'))
})
app.get('/hello(.html)?', (req,res,next)=>{
   console.log('attempting to open hello.html');
   next()
},(req,res)=>{
    res.send('Hello World!')
}
)

app.all('*', (req,res)=>{
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})

app.use(errorHandler)


app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
} )