const express = require("express");
const cors = require("cors");
require("dotenv");
const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);


const PORT = process.env.PORT || 8080;

app.get("/", (req,res)=>{
    res.send("Hello")
})


app.listen(PORT, () =>{
    console.log("http://localhost:" + PORT);
})