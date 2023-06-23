const express = require('express')
const router = express.Router()
const path = require('path')
const handleNewUser = require('../../controller/registerController')

router.post('/',handleNewUser )

module.exports = router