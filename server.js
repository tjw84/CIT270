const express = require('express');//Import express library
const bodyParser = require('body-parser'); //call body parser middleware
const app = express();//Use express
const port = 3000;



app.use(bodyParser.json());//use middleware

app.listen(port,()=>{console.log("I am listening! "+port)});


app.post('/login',(request,response)=>{
    const loginRequest = request.body;
    //console.log(JSON.stringify(request.body));
    if (loginRequest.userName=='scmurdock@gmail.com' && loginRequest.password=='P@ssW0rd')
    {
        response.status(200);
        response.send('Welcome');
    } else {
        response.status(401);
        response.send('Unauthorized');
    }
});

app.get('/',(request,response)=>{
    response.send("Hello")
}); //Response
