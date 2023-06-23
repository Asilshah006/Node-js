const express = require('express')
const router = express.Router()
const path = require('path')
const handleLogin = require('../../controller/authController')

router.post('/',handleLogin)

module.exports = router