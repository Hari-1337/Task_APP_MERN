const express = require('express')
const app = express()
require('dotenv').config();
const mongoose = require('mongoose')
const Todo = require('./models/TODO')
const cors = require('cors')
const bodyParser = require('body-parser')

//CORS
app.use(cors())
app.use(bodyParser.json())



//Connect DB
mongoose.connect(process.env.DB_CONNECTION)

app.delete('/del/:id',(req,res)=>{
    // console.log(req.params.id)
    // Todo.findByIdAndRemove(req.params.id)
    Todo.deleteOne({_id:req.params.id}).exec()
})

app.post('/save',(req,res)=>{
    // console.log(req.body)
    const newTodo = new Todo({
        work:req.body.work
    }).save().then(()=>{
        console.log("Inserted")
    })
    
})

app.get('/',async (req,res)=>{
    const hey = await Todo.find({},{work:1})
    res.json(hey)
})


app.listen(3000)