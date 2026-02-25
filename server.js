const express = require('express')
const app = express()
const port = 3000

const cors = require('cors')
app.use(express.json());


app.use(cors());

let tasks = [];
let completedTasks = [];

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/add', (req, res) => {
    const { Title, description ,id,date} = req.body
    let task = {
        Title: Title,
        Description: description,
        id:id,
        date:date
    }
    tasks.push(task)
    res.status(200).json({ message: "Task added succesfully" })

})

app.delete('/delete/:id', (req, res) => {
    const  id  = Number(req.params.id)
    let index = tasks.findIndex((obj) => { return obj.id == id })
    if (index != -1) {
        tasks.splice(index, 1)
        res.status(200).json({ message: "Deleted" })
    }
    else {
        res.status(404).json({ message: "Task not available" })
    }
})

app.put('/update/:id', (req, res) => {
    const { Title, description } = req.body
    const id = Number(req.params.id);

    let index = tasks.findIndex((obj)=>{
        return obj.id===id
    })
    if(index==-1){
        res.status(404).json({message:"task not fount"})

    }
    else{
        
    tasks[index].Title=Title;
    tasks[index].description= description;

    }


    res.status(200).json({message:"Updated successfully"})


})


app.delete('/transfer/:id',(req,res)=>{
    const id  = Number(req.params.id)

    let index = tasks.findIndex((obj)=>{
       return obj.id===id
    })

    let moveObject = tasks.splice(index,1)[0]

    completedTasks.push(moveObject);
    res.status(200).json({message:"od"})

})

app.get("/completedTasks",(req,res)=>{
    res.status(200).json(completedTasks)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
