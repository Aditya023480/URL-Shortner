import 'dotenv/config';
import express from 'express';
import cors from 'cors'
import router from './modules/url shortener/routes/url.router.js'

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(router);


try{
    app.listen(port , ()=>{
        console.log("Server Started!");
    })
}


catch(err){
    console.log("Server Failed" , err);
}
