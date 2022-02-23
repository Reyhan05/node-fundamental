/**
 * Url Query String
 *
 * Contoh :
 * URL dari sekedar https://www.google.com/
 * Kemudian kita masukkan keyword Indonesia di kolom pencarian Google
 * Tetiba URLnya menjadi https://www.google.com/search?q=Indonesia 
 * 
 * q = Key
 * Indonesia = Value
 * 
 * digunakan untuk mengirim data ke server dengan method GET
 */

const http = require("http");
const url = require("url");
const queryString = require("querystring");

const server = http.createServer((req, res)=>{

    let urlRequest, // Ini berisi path yang terdapat di request
urlObj,         // Ini berisi url yang telah diproses 
urlQuery,       // Object dari query
dataResponse    // object dari Parsing

res.setHeader("Content-Type","application/json");
urlRequest = req.url;

//convert urlRequest menjadi object
urlObj = url.parse(urlRequest);
console.log(urlObj)
 
    // Ambil property yang terdapat di object url
    urlQuery = urlObj.query;
    
    if(!urlQuery){
        dataResponse = {
            data: "Query Tidak ditemukan"
        };
        return res.end(JSON.stringify(dataResponse));
    }
    dataResponse = queryString.parse(urlQuery);
    return res.end(JSON.stringify(dataResponse));
});

server.listen(3000);