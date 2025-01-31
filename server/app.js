if (process.env.NODE_ENV === "development") {
  require("dotenv").config()
}


const express = require("express")
const app = express()
const port = 3000
const router = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const cors = require("cors")


app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(router)
app.use(errorHandler)

app.listen(port, ()=> {
  console.log(`Listening to port: ${port}`);
})