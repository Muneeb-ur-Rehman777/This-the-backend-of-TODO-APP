const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')


const cors = require('cors')
app.use(express.json());
app.use(cors());

//connection
mongoose.connect('mongodb://127.0.0.1:27017', {
}).then(() => {
    console.log("Connected Succesfully")
}).catch((err) => {
    console.log("There is an error", err)
})

// Schema
const taskSchema = new mongoose.Schema({
    Title: String,
    description: String,
    id: Number,
    date: String
})

// collection
const taskss = mongoose.model("Tasks", taskSchema)



app.get('/doahs', async (req, res) => {
    const users = await taskss.find({})
    res.status(200).json(users)
})

app.post('/add', async (req, res) => {
    const { Title, description, id, date } = req.body
    try {
        const newTask = new taskss({
            Title: Title,
            description: description,
            id: id,
            date: date
        })
        await newTask.save();
        res.status(200).json({ message: "Task added succesfully" })
    }
    catch (err) {
        res.status(200).json(err)
    }
})

app.delete('/delete/:id', async (req, res) => {
    const id = Number(req.params.id)
    await taskss.deleteOne({ id: id })
    res.status(200).json({ message: "Data deleted" })

})

app.put('/update/:id', async (req, res) => {
    const { Title, description } = req.body
    const id = Number(req.params.id);
    try {
        await taskss.updateOne({ id: id }, { $set: { Title: Title, description: description } })
        return res.status(200).json({ message: "udated from DataBase" })
    }
    catch (err) {
        return res.status(200).json({ message: "err", err })

    }
})



app.delete('/transfer/:id', async (req, res) => {
    const id = Number(req.params.id)

    try {
        const specificData = await taskss.findOne({ id: id })

        await taskss.deleteOne({ id: id })
        const savedData = specificData.toObject();
        const date = savedData.id
        delete savedData.id

        const completedTask = mongoose.model("completedTasks", taskSchema)
        let ne = new completedTask({ ...savedData,id:date })
        await ne.save();

        res.status(200).json({ message: "od" })
    }
    catch (err) {
        res.status(500).json({ message: "There is an error in server" })

    }

})

app.get("/completedTasks", async (req, res) => {
    const allDataOfCompletedTasks = await completedTask.find({})
    res.status(200).json(allDataOfCompletedTasks)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
