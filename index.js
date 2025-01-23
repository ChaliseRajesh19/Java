import express from "express";

const app = express()

app.use(express.json())

// app.use(morgan("dev"))
//app.use(cors())
const corsOptions ={
    origin : '*',
    methods : 'GET, HEAD , PUT, PATCH,POST,DELETE',
    allowedHeaders : ['Content-Type','Authorization'],
}

// app.use(cors(corsOptions));

app.use((req,res,next)=>{
    console.log("Thhis is application level middleware")
    next();
})

//authentication
app.use ((req, res, next) => {
    let isLoggedIn = true;//false rakhera hera
    if(isLoggedIn){
        next();
    }else{
        res.end("I have access to response cycle.")
    }
})

//authorization 
app.use((req,res,next)=>{
    let isAdmin = true;
    if(isAdmin){
        next();
    }else{
        res.end("Only admin are allowed to enter")
    }
})

//for Both authentication and authorization
// app.use ((req, res, next) => {
//     let isLoggedIn = true;//false rakhera hera
//     if(isLoggedIn){
//         next();
//     }else{
//         res.end("I have access to response cycle.")
//     }
// },()=>
//     app.use((req,res,next)=>{
//         let isAdmin = true;
//         if(isAdmin){
//             next();
//         }else{
//             res.end("Only admin are allowed to enter")
//         }
// }))

//middlewares have access to req.body to data
app.use(function (req,rex,next){
    let data = req.body;
    req.body = {
        ...req.body,
        age : 50
    }
    next();
})

app.get("/test",(req,res)=>{
    res.end("Response from the test end point")
})
//("end",callback)//vitra ko describe

// app.post("/login",(req,res)=>{
//     console.log(req.body)

// })

app.get("/",(req,res)=>{
    res.end("Response from the main endpoint")
})

app.post("/",(req,res)=>{
    console.log("body at / endpoint : ",req.body)
    res.end("response from post request")
})


app.post("/login",(req,res)=>{
    // const{email,password}=req.body
    //email request
    //password correct
    //token generate => return
    console.log("body" ,req.body);
    res.end("login page")
    //login code
})

app.get("/student",()=>{
    //get token
    //token decrypt
    //
    
    //databae => get info
    //return info
})

app.listen(3005,(err)=>{
    if(err){
        console.log("Error running form the server:",err);
    }
    console.log("Server is running at the port 3005")
})