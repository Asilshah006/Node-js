const express = require('express')
const router = express.Router()
const employeeController = require('../../controller/employeesController')
const verifyJWT =require('../../middleware/verifyJWT')


router.route('/')
    .get( employeeController.getEmployees)
    .post(employeeController.createNewEmployee)
    .put(employeeController.updateEmployee)
    .delete(employeeController.deleteEmployee)

router.route('/:id')
    .get(employeeController.getEmployee)


module.exports = router