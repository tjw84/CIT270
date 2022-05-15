const express = require('express');//Import express library
const bodyParser = require('body-parser'); //call body parser middleware
const app = express();//Use express
const port = 3000;
const redis = require('redis');

const redisClient = redis.createdClient('hget passwords');

// const md5 = require('md5');
//const hashedPasswordfromuser = md5(req.body.password);
/* hset passwords scmurdock@gmail.com P@ssW0rd
hget passwords scmurdock@gmail.com hash
hset myhash password //password; //set hash to the hash of the password given

*/


app.use(bodyParser.json());//use middleware

app.listen(port,()=>{console.log("I am listening! "+port)});


app.post('/login',(request,response)=>{
    const hashedPassword = md5(req.body.password);
    const passwordHashRedis = redisClient.hGet('password');
    const loginRequest = request.body;
    //console.log(JSON.stringify(request.body));
    if (loginRequest.userName=='scmurdock@gmail.com' && loginRequest.password=='5ca33d221fd09f16c1ecba9c1aadc3eb')
    {
        response.status(200);
        response.send('Welcome');
    } else {
        response.status(401);
        response.send('Unauthorized');
    }
});

const validatePass = (request, respose)=>{}
app.get('/',(request,response)=>{
    response.send("Hello")
}); //Response
