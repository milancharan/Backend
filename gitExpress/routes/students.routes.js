const express = require('express')
const router =  express.Router()

const { getStudents, addStudent, updateStudent, deleteStudent, getStudentById } = require ('../controller/students.controller')

router.route('/').get(getStudents)
router.route('/:id').get(getStudentById)
router.route('/').post(addStudent)
router.route('/:id').put(updateStudent)
router.route('/:id').delete(deleteStudent)

module.exports = router