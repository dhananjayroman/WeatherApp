const http = require("http");
const fs = require("fs");
var requests = require("requests");

const homeFile=fs.readFileSync("home.html", "utf-8");

const replaceVal=(tempVal, orgVal)=>{
    let temperature=tempVal.replace("{%tempval%}", orgVal.main.temp);
    temperature=temperature.replace("{%loc%}", orgVal.name);
    temperature=temperature.replace("{%country%}", orgVal.sys.country);
    temperature=temperature.replace("{%tempStatus%}", orgVal.weather[0].main)
     return temperature;

}
const server = http.createServer((req, res) => {
    if(req.url=="/"){
       requests(
        "https://api.openweathermap.org/data/2.5/weather?lat=18.14861000&lon=73.84336000&appid=ae27d5d7165852e667e3dac2828b459c"
    )
    .on('data', (chunk) => {
        const objdata=JSON.parse(chunk);
        const arrData=[objdata]
       // console.log(arrData[0].main.temp);//array of an object data

       
       const realTimeData=arrData.map((val) => replaceVal(homeFile, val)).join(" ")
       res.write(realTimeData);
       //console.log(realTimeData)
    })
    .on('end', (err) => {
        if(err)
        return console.log('connection is closed due to eror', err);
        //console.log('end')
        res.end()
       });
    }
});
server.listen(5000)

