import { createURLservice , shortURL } from "../services/url.service.js";

const createURLcontroller = async (req , res) => {
    const newurl = await createURLservice(req.body);
    const publicBaseUrl = process.env.PUBLIC_BASE_URL || `${req.protocol}://${req.get('host')}`;
    return res.json({
        newURL:`${publicBaseUrl}/${newurl}`
    })
}

const redirectController = async (req , res)=> {


    const shorturl = await shortURL(req.params.url);
    res.redirect(shorturl.rows[0].oldurl)

}

export {createURLcontroller , redirectController};
