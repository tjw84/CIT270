const express = require('express');//Import express library
const app = express();//Use express

app.listen(3000,()=>{console.log('I am listening!')});
app.get('/',(request,response)=>{response.send("Hello")}); //Response