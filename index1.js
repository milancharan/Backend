const express = require('express')
const app = express()
const Students = require('./students')

app.listen(3000)
app.use(express.json())

app.get('/api/student', (req, res) => {
    res.json(Students[0])
})
app.get('/api/students', (req, res) => {
    res.json(Students)
})

app.post('/api/students', (req, res) => {
    if(!req.body.email){
        res.status(400)
        return res.json({error: "please enter email."})
    }

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
})

app.put('/api/students/:id', (req, res) => {
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
})

app.delete('/api/students/:id', (req, res) => {
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
})











// const express = require('express')
// const app = express()
// const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.get('/about', (req, res) => {
//     res.send('Hello About!')
//   })

// app.get('/contact', (req, res) => {
//     res.send('Hello Contact!')
//   })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })