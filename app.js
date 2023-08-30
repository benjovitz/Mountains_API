const express = require("express")
const fs = require("fs/promises")

const app = express()

app.get("/mountains", async (req, res)=>{
    const data = await fs.readFile("./data.json")
    res.send(JSON.parse(data))
})

app.get("/mountains/:id", async (req, res)=>{
    
    const id = Number(req.params.id)
    
    if(!isNaN(id)){
        const data = await fs.readFile("./data.json")
        const mountains = JSON.parse(data)
        const mountain = mountains.find(m => m.id === id)

        res.send(mountain)
    } else{
        res.sendStatus(406)
    }
})

app.post("/mountains", async (req, res)=>{
    const newMountain = req.body
    const data = await fs.readFile("./data.json")

    const mountains = JSON.parse(data)
    console.log(mountains)
    const oldId = mountains[mountains.length - 1].id
    console.log(newMountain)
})

app.listen(8080)

