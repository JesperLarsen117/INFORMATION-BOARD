const express = require('express');
const app = express();
const fetch = require('node-fetch');//get node-fetch

//Sørger for at vi kan læse post variabler
app.use(express.urlencoded({extended:true}));

app.set("view engine", "ejs"); // Instrukser til express at der bruges ejs, som template sprog.

//Require config & route files
require('./routes/index')(app);

//Fetch her
fetch('https://infoboard.mediehuset.net/api/')
.then((response) => {
    return response.json();
})
.then((myJson) => {
    const news = myJson.news;
    console.log(news);
});

//Angiver port der skal lyttes på
app.listen(5000, () => {
    console.log("Express server kører... Port: 5000");
});