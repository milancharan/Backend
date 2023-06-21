const express = require('express')
const app = express()
app.use(express.json())
const Students = require('../students')
const Joi = require('joi')

const getStudents = async(req, res) => {
    res.json(Students)
}

const getStudentById = (req, res) => {
    res.json(Students[req.params.id-1])
}

const schema = Joi.object({
    first_name: Joi.string().min(3).max(20).required(),
    last_name: Joi.string().min(3).max(10),
    email: Joi.string().min(11).max(30).required()
})

const addStudent = async(req, res) => {
    // if(!req.body.email){
    //     res.status(400)
    //     return res.json({error: "please enter email."})
    // }

    const { error, value } = schema.validate(req.body)

    if(error) {
        console.log(error);
        return res.send('Invalid Request.')
    }

    // try {
    //     await schema.validateAsync(req.body);
    // }
    // catch (err) { }

    const user = {
        id: Students.length + 1,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
    }
    Students.push(user)
    console.log(user);
    // console.log(req.body);
    res.json(user)
}


const updateStudent = async(req, res) =>{

    const { error, value } = schema.validate(req.body)

    if(error) {
        console.log(error);
        return res.send('Invalid Request.')
    }

    let id = req.params.id
    let first_name = req.body.first_name
    let last_name = req.body.last_name
    let email = req.body.email

    // let user1 = {
    //     first_name: req.body.first_name,
    //     last_name: req.body.last_name,
    //     email: req.body.email,
    // }
    let index = Students.findIndex((student) => {
        return (student.id == Number.parseInt(id))
    })
    
    if(index>=0) {
        let user2 = Students[index]
        user2.last_name = last_name
        user2.first_name = first_name
        user2.email = email
        // user2 = user1
        res.json(user2)
    } else {
        res.status(404)
    }
    
    // console.log(id);
    // res.json(id)
    
}

const deleteStudent = async(req, res) =>{
    let id = req.params.id
    let index = Students.findIndex((student) => {
        return (student.id == Number.parseInt(id))
    })

    if(index >= 0){
        let std = Students[index]
        Students.splice(index, 1)
        res.json(std)
    } else{
        res.status(404)
    }
}

module.exports = { getStudents, addStudent, deleteStudent, updateStudent, getStudentById }