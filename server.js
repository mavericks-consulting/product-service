
const express = require('express')
const app = express()

app.get("/health", (request, response) => {
  response.set('Cache-Control', 'no-cache').status(200).send("OK")
})

app.get("/products", (request, response) => {
  const products = require('./products.json')
  let filteredProducts = products
  if(request.query.ids) {
    let ids = request.query.ids.split(',')
    filteredProducts = products.filter(product => {
      return ids.some(id=>{
        return product.id === id
      })
    })
  }
  response.send(filteredProducts)
})

app.get("/products/:id", (request, response) => {
  const products = require('./products.json')
  const matchedProduct = products.find((product) => product.id === request.params.id)
  matchedProduct ? response.send(matchedProduct) : response.sendStatus(404)
})

const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})

