import { createURLservice , shortURL } from "../services/url.service.js";

const createURLcontroller = async (req , res) => {
    const newurl = await createURLservice(req.body);
    return res.json({
        newURL:`localhost:3000/${newurl}`
    })
}

const redirectController = async (req , res)=> {


    const shorturl = await shortURL(req.params.url);
    res.redirect(shorturl.rows[0].oldurl)

}

export {createURLcontroller , redirectController};
