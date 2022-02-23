const http = require("http");

const server = http.createServer((req, res) => {
    let url, method, dataResponse;

    res.setHeader("Content-Type","application/json");
    url = req.url;

    method = req.method?? "get" // Ambil methodnya jika idak ada maka diubah menjadi get

    if(url == "/"){
        dataResponse = {
            data: "Ini adalah halaman HomePage"
        };
    } else if (url.toLowerCase() === "/login"){
        if(method.toLowerCase() === "post"){
            dataResponse = {
                data: "Ini adalah halaman Login",
            };  
        }   
     } 
    //  else if (url.toLowerCase() === "/Register"){
    //     dataResponse = {
    //         data: "Ini adalah halaman Register",
    //     };
    // } 

    return res.end(JSON.stringify(dataResponse));
}); 
server.listen(3000);