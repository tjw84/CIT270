const express = require('express'); //Import express library
const bodyParser = require('body-parser'); //call body parser middleware
const md5 = require('md5'); //import md5 for future use
const app = express(); //Use express (call express function into this variable as an object)
const port = 4043;//4043 or 443
const {createClient} = require('redis');
//const { response } = require('redis');
const fstat  = require('fs');
const https = require('https');

const redisClient = createClient({
    socket:{
        port:6379,
        host:'127.0.0.1'

    } 
});

const validatePass = async(request, response)=>{
const requestHashedPassword = md5(request.body.password);
const redisHashedPassword = await redisClient.hGet('passwords', request.body.userName);
// const loginRequest = request.body;

if (
    requestHashedPassword==redisHashedPassword){
        response.status(200);
        response.send('Welcome');
        console.log('Welcome!');//
    } else {
        response.status(401);
        response.send('Unauthorized');
    }
}



// console.log("Request Body",JSON.stringify/request.body);  

app.use(bodyParser.json());//use middleware

https.createServer({
    key: fs.readFileSync('server.key'),
    cer: fs.readFileSync('server.cert'),
    passphrase: 'P@ssw0rd',
},  
    app).listen(port, async() =>{
    await redisClient.connect();
    console.log ('I\'m listening');
})


app.get('/',(request,response)=>{
    response.send("Hello")
}); //Response
app.post('/login',validatePass);

const signup = async(request, response)=>{
    const userPass = md5(request.body.password);
    redisClient.hSet(userName,passwords);
    response.send('This user is bad');

}



app.post('/signup',signup);