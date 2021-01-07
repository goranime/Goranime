if (process.env.NODE_ENV === "development") {
  require("dotenv").config()
}

const express = require("express")
const app = express()
const port = 3000
const router = require("./routes/index.js")

app.use(express.urlencoded({extended:false}))
app.use(router)

app.listen(port, ()=> {
  console.log(`Listening to port: ${port}`);
})