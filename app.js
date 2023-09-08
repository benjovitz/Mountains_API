const express = require("express")
const app = express()

app.use(express.json())

app.get("/", (req, res) => {
  res.send({message: "This is a mountains api with data on famous mountains :)"})
})

app.get("/mountains", (req, res) => {
   res.send({data: mountains})
})


app.get("/mountains/:id", (req, res) => {

    const mountain = findMountain(Number(req.params.id))
    
    mountain ? res.send({data: mountain}) : res.sendStatus(404)
})
 
app.post("/mountains", (req, res) => {

  const body = req.body

  const newMountain = {}

  if(checkFullBody(body)){
    const lastId = mountains[mountains.length - 1].id

    newMountain.id = lastId + 1
    newMountain.name = body.name
    newMountain.elevation_meters = body.elevation_meters
    newMountain.latitude = body.latitude
    newMountain.longitude = body.longitude
    newMountain.description = body.description

    mountains.push(newMountain)

    res.sendStatus(201)
  } else {
    res.status(406).send({message: "Need a full body"})
  }
 
  
})

app.patch("/mountains/:id", (req, res) => {
  const body = req.body
  const mountainToUpdate = findMountain(Number(req.params.id))

  if(mountainToUpdate){

      mountainToUpdate.name = body?.name ?? mountainToUpdate.name;
      mountainToUpdate.elevation_meters = body?.elevation_meters ?? mountainToUpdate.elevation_meters;
      mountainToUpdate.latitude = body?.latitude ?? mountainToUpdate.latitude;
      mountainToUpdate.longitude = body?.longitude ?? mountainToUpdate.longitude;
      mountainToUpdate.description = body?.description ?? mountainToUpdate.description;

      res.sendStatus(201)
  } else {
      res.sendStatus(404)
  }


})

app.put("/mountains/:id", (req, res) => {
  const mountain = findMountain(Number(req.params.id))

  const body = req.body

  if(mountain){
    if(checkFullBody(body)){
      mountain.name = body.name
      mountain.elevation_meters = body.elevation_meters
      mountain.latitude = body.latitude
      mountain.longitude = body.longitude
      mountain.description = body.description
  
      res.sendStatus(200)
    } else{
      res.status(406).send({message: "Need a full body"})
    }   
  } else {
    res.sendStatus(404)
  }

})

app.delete("/mountains/:id", (req, res) => {
  const id = Number(req.params.id)
  const mountainIndex = mountains.findIndex(mountain => mountain.id === id)

  if(mountainIndex !== -1){

    mountains.splice(mountainIndex, 1)
    res.send(200)

  } else {
    res.sendStatus(404)
  }
})

function findMountain(id){

    if(!isNaN(id)){

    const mountain = mountains.find((mountain) => mountain.id === id)

    return mountain
    } 
    return null
}

function checkFullBody(body){
  if (
    body.name &&
    body.elevation_meters &&
    body.latitude &&
    body.longitude &&
    body.description
  ){
    return true
  }
  return false
}

const mountains = [
    {
      "id": 1,
      "name": "Mount Fuji",
      "elevation_meters": 3776,
      "latitude": 35.3606,
      "longitude": 138.7274,
      "description": "Mount Fuji, in Japan, is the country's highest peak and an iconic stratovolcano. It's revered in Japanese culture and is a UNESCO World Heritage site."
    },
    {
      "id": 2,
      "name": "Mount Everest",
      "elevation_meters": 8848,
      "latitude": 27.9881,
      "longitude": 86.925,
      "description": "Mount Everest, in the Himalayas, is the world's highest peak. Climbers face extreme altitudes, unpredictable weather, and breathtaking views on their ascent."
    },
    {
      "id": 3,
      "name": "Kilimanjaro",
      "elevation_meters": 5895,
      "latitude": -3.0674,
      "longitude": 37.3556,
      "description": "Mount Kilimanjaro in Tanzania is Africa's highest mountain. Despite its proximity to the equator, it features snow and ice due to its impressive height."
    },
    {
      "id": 4,
      "name": "Matterhorn",
      "elevation_meters": 4478,
      "latitude": 45.9763,
      "longitude": 7.6586,
      "description": "The Matterhorn, straddling Switzerland and Italy, is an iconic mountain known for its pyramid shape. Climbers are drawn to its challenging ascent."
    },
    {
      "id": 5,
      "name": "Denali",
      "elevation_meters": 6190,
      "latitude": 63.0695,
      "longitude": -151.007,
      "description": "Mount Denali (formerly McKinley) in Alaska, USA, is North America's highest peak. It's known for extreme cold, strong winds, and challenging climbs."
    }
  ]

app.listen(8080)

