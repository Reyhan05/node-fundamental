/**
 * 
 * Request Body 
 * 
 * learn parsing data body dari request
 */

/**
 * bentuk transaksi client ada 2 yaitu upload dan download
 *  1. mulai dari inisiasi data pada tujuan 
 *  2. Pemisahan data yang akan dikirim menjadi bagian kecil (chunks)
 *  3. Pengirim data chunks ke tujuan disebut dengan Buffering
 *  4. Setelah data selesai di buffer semua proses data agar menjadi utuh kembali
 */

 const http = require("http");
 const querystring = require("querystring")
 const server = http.createServer((req, res)=>{
     let urlReq, methodReq, dataRequest
     
     const chunkArr = [];
     const dataResponse = {};
     res.setHeader("Content-Type","application/json")

     //untuk mendapatkan path dari url
     urlReq = req.url;

     //kalau methodnya kosong isi dengan get
     methodReq = req.method?? "get"

     // kita akan membuat routing ke login
     if (urlReq.toLowerCase() === "/login") {
        if (methodReq.toLowerCase() === "get") {
            //tandai halaman login 
            dataResponse.data = "ini adalah halaman login"
        } else if (methodReq.toLowerCase() === "post") {
            // Tambahkan chunks ke chunkArr
            req.on("data", (chunk) => {
                chunkArr.push(chunk)    
            });            
        } else {
            dataResponse.data = "Hanya menerima method GET dan POST";
         }
     }else {
        // jika bukan /login yang diakses, ya beritahu aja
        dataResponse.data = "Gunakan endpoint /login";
      }

      //setelah data request selesai, akan diterima oleh serve
      req.on("end", ()=> {
          //jika chunk ada datanya
          if(chunkArr.length !==0){
              dataRequest = Buffer.concat(chunkArr).toString;
              //Ambil data requestnya
              console.log(dataRequest)
              let requestObj = querystring.parse(dataRequest);

              //masukan object tersebut ke responnya
              dataResponse.data = requestObj;
          };
          return res.end(JSON.stringify(dataResponse));
      });
 });

 server.listen(5000)