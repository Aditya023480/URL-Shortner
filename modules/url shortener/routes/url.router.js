import {Router} from 'express';
import { createURLcontroller , redirectController} from '../controllers/url.controller.js';

const router = Router();

router.get("/" , (req , res)=>{
    console.log("Hello World");
    res.send("Whatup");
})

router.post("/createURL" , createURLcontroller);
router.get("/:url" , redirectController)


export default router;