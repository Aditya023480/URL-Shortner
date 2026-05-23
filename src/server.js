import express from 'express';
import cors from 'cors'
import router from './modules/url shortener/routes/url.router.js'

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);


try{
    app.listen(3000 , ()=>{
        console.log("Server Started!");
    })
}


catch(err){
    console.log("Server Failed" , err);
}
