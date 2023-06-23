const http = require('http')
const path = require('path')
const fs = require('fs')
const fspromises = require('fs').promises
const {logger} = require('./middleware/logEvents')
const express = require('express')
const app = express()
const cors = require('cors')
const errorHandler = require('./middleware/errorHandler')
const corsOption = require('./config/corsOption')
const verifyJWT = require('./middleware/verifyJWT')
const cookieParser = require('cookie-parser')

const PORT = process.env.PORT || 3500

app.use(logger)

app.use(cors(corsOption))

app.use(express.urlencoded({extended : false}))

app.use(express.json())

app.use(cookieParser)

app.use('/',express.static(path.join(__dirname, 'public')))



app.use('/subdir',express.static(path.join(__dirname, 'public')))

app.use('/subdir' , require('./routes/subdir'))
app.use('/' , require('./routes/root'))
app.use('/register', require('./routes/api/register'))
app.use('./auth', require('./routes/api/auth') )
app.use('./refresh', require('./routes/api/refresh') )
app.use('/logout' , require('./routes/api/logout'))

app.use(verifyJWT)

app.use('/employees' , require('./routes/api/employees'))

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