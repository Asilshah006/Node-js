
const data = {
    employees : require('../model/employees.json'),
    setEmployees : function(data) {this.employees = data}
}


const getEmployees = (req,res)=>{
    res.json(data.employees)
}

const createNewEmployee = (req,res) =>{
    const newEmployee = {
        id : data.employees[data.employees.length - 1].id + 1 || 1,
        firstname : req.body.firstname,
        lastname : req.body.lastname
    }

    if(!newEmployee.firstname || !newEmployee.lastname){
        return res.status(400).json('message : First and last names are required')
    }

    data.setEmployees([...data.employees, newEmployee])
    res.status(201).json(data.employees)
}

const updateEmployee = (req,res)=>{
    const employee = data.employees.find(emp =>{
        emp.id === parseInt(req.body.id)
    })

    if(!employee){
        res.status(401).json({'message' : `Employee ID ${req.body.id} not Found` })
    }
    if(req.body.firstname) employee.first_name = req.body.first_name
    if(req.body.lastname) employee.last_name = req.body.last_name
    const filteredArray = data.employees.filter(emp =>{emp.id !== parseInt(req.body.id)})
    const unsortedArray = [...filteredArray, employee]
    data.setEmployees(unsortedArray.sort((a,b)=>{a.id > b.id ? 1 : a.id < b.id ? -1 : 0}))
    res.json(data.employees)
}

const deleteEmployee = (req,res)=>{
    const employee = data.employees.find(emp =>{
        emp.id === parseInt(req.body.id)
    })

    if(!employee){
        res.status(401).json({'message' : `Employee ID ${req.body.id} not Found` })
    }
    const filteredArray = data.employees.filter(emp =>{emp.id !== parseInt(req.body.id)})
    data.setEmployees([...filteredArray])
    res.json(data.employees)
}

const getEmployee = (req,res)=>{
    const employee = data.employees.find(emp =>{
        emp.id === parseInt(req.body.id)
    })

    if(!employee){
        res.status(401).json({'message' : `Employee ID ${req.body.id} not Found` })
    }
   res.json(employee)
}

module.exports = {
    getEmployees,
    getEmployee,
    createNewEmployee,
    updateEmployee,
    deleteEmployee
}