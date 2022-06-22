const express = require('express'); //Import express library
const bodyParser = require('body-parser'); //call body parser middleware
const md5 = require('md5'); //import md5 for future use
const app = express(); //Use express (call express function into this variable as an object)
const port = 3000;
const {createClient} = require('redis');
const redisClient = createClient({
    socket:{
        port:6379,
        host:'127.0.0.1'

    } 
});
redisClient.connect();

const validatePass = async(request, response)=>{
const requestHashedPassword = md5(request.body.password);
const redisHashedPassword = await redisClient.hGet('passwords', request.body.userName);
const loginRequest = request.body;
console.log("Request Body",JSON.stringify/request.body);

if (
    requestHashedPassword==redisHashedPassword){
        response.status(200);
        response.send('Welcome');
        console.log('Welcome!')//;? pasted it but that should not work...
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