const express = require("express")
const app = express()
var cors = require("cors");
app.use(express.json());
app.use(cors());
const router = require("./routes/striperoute")




app.use("/", router)
app.listen(4242)
console.log("server running at port 3030")