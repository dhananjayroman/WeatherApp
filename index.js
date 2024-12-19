const http = require("http");
const fs = require("fs");
const requests = require("requests");

const homeFile = fs.readFileSync("Weather.html", "utf-8");

// Function to replace placeholders in the HTML template with actual data
const replaceVal = (tempVal, orgVal) => {
    let temperature = tempVal.replace("{%tempval%}", orgVal.main.temp - 273.15); // Convert from Kelvin to Celsius
    temperature = temperature.replace("{%loc%}", orgVal.name);
    temperature = temperature.replace("{%country%}", orgVal.sys.country);
    return temperature;
}

// Create the server
const server = http.createServer((req, res) => {
    const url = req.url;

    // Check if the request is for weather data
    if (url.startsWith("/weather")) {
        // Extract latitude and longitude from query parameters
        const urlParams = new URLSearchParams(url.split('?')[1]);
        const lat = urlParams.get('lat');
        const lon = urlParams.get('lon');
        
        // Fetch weather data from OpenWeatherMap API
        requests(
            `https://api.openweathermap.org/data/2.5/weather?lat=${18.1458}&lon=${ 73.8429}&appid=ae27d5d7165852e667e3dac2828b459c`
        )
        .on('data', (chunk) => {
            const objData = JSON.parse(chunk);
            const arrData = [objData];
            const realTimeData = arrData.map((val) => replaceVal(homeFile, val)).join(" ");
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(realTimeData); 
        })
        .on('end', (err) => {
            if (err) {
                console.log('Connection closed due to error:', err);
                res.writeHead(500, { "Content-Type": "text/html" });
                res.end("Error fetching weather data.");
            } else {
                res.end();
            }
        });
    } else {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("404: Page Not Found");
    }
});

// Start the server
server.listen(5500, () => {
    console.log("Server is running on port 5500");
});
