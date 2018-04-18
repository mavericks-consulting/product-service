
const express = require('express')
const app = express()

app.get("/products", (request, response) => {
  const products = require('./products.json')
  response.send(products)
})

app.get("/products/:id", (request, response) => {
  const products = require('./products.json')
  const matchedProduct = products.find((product) => product.id === request.params.id)
  matchedProduct ? response.send(matchedProduct) : response.sendStatus(404)
})

const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})

