const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')

function getData() {
  let rawData = {}
  try {
    rawData = JSON.parse(fs.readFileSync('./features.json'))
  } catch (e) {
    console.log(e)
  }
  return rawData
}

const app = express()
app.use(bodyParser.json())

app.use(express.static('dist'))
app.get('/api/v1/features', (req, res) => res.send(getData()))
app.patch('/api/v1/features', (req, res) => {
  const newData = { ...getData(), ...req.body }
  fs.writeFileSync('./features.json', JSON.stringify(newData))
  res.send(newData)
})
app.delete('/api/v1/features/:featureName', (req, res) => {
  const data = getData()
  delete data[req.params.featureName]
  fs.writeFileSync('./features.json', JSON.stringify(data))
  res.send(data)
})
app.listen(18080, () => console.log('Listening on port 18080!'))
