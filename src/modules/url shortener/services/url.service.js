import pool from '../../../common/config/db.js'

const createURLservice =async (data)=>{

const {url , custom} = data;

let count = await pool.query("SELECT COUNT(*) FROM URL where custom = $1" , [custom]);
let newurl = `${custom + count.rows[0].count}`;

await pool.query("INSERT INTO URL(oldurl , custom , newurl) VALUES ($1 , $2 , $3)" , [url , custom , newurl]);

return newurl;

}

const shortURL = async (data)=>{
    console.log(data)
    const result = await pool.query("select oldurl from URL where newurl = $1" , [data]);
    console.log(result)
    return result;
}

export {createURLservice , shortURL}
