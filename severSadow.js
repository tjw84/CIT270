const express = require('express'); //Import express library
const bodyParser = require('body-parser'); //call body parser middleware
//const { createClient } = require('node-redis');
const md5 = require('md5'); //import md5 for future use
const app = express(); //Use express (call express function into this variable as an object)
const port = 3000;
//const redis = require('redis');
const {createClient} = require('redis');
const redisClient = createClient({
    socket:{
        port:6379,
        host:'127.0.0.1'

    } 
});
//createClient.connect();
redisClient.connect();
// const redisClient = redis.createdClient('hget passwords');
// const redisClient = createClient('hget passwords');

//const hashedPasswordfromuser = md5(req.body.password);
/* hset passwords scmurdock@gmail.com P@ssW0rd
hget passwords scmurdock@gmail.com hash
hset myhash password //password; //set hash to the hash of the password given

*/


app.use(bodyParser.json());//use middleware

app.listen(port,()=>{console.log("I am listening! "+port)});


/*app.post('/login',(request,response)=>{
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
*/
const validatePass = async(request, response)=>{
//    await redisClient.connect();
    const requestHashedPassword = md5(request.body.password);
    const redisHashedPassword = await redisClient.hGet('passwords', request.body.userName);
    const loginRequest = request.body;
    console.log("Request Body",JSON.stringify/request.body);

if (
    //longinRequest.userName=='scmurdock@gmail.com' && requestHashedPassword==redisHashedPassword)
    requestHashedPassword==redisHashedPassword){
        response.status(200);
        response.send('Welcome');
        console.log('Welcome!')
        const i = 0 
        
        //redisClient.disconnect();
        
    } else {
        response.status(401);
        response.send('Unauthorized');
    }
}
app.get('/',(request,response)=>{
    response.send("Hello")
}); //Response
app.post('/login',validatePass);

const signup = async(request, response)=>{
    const userPass = md5(request.body.password);
    redisClient.hSet(userName,passwords);
    response.send('This user is bad');

}

/* 
const savePassword = async(request, response)=>{
    const clearTextPassword = reqest.body.password;
    const hashedPass = md5(clearTextPassword);
    await redisClient.hSet('passwords', request.body.userName, request.body.password); //this is wrong
    response.status(200);//200 means ok
    response.send({result:"Saved"});
}
*/

app.post('/signup',signup);
