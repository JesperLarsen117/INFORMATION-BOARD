const express = require('express');
const app = express();
const fetch = require('node-fetch');

module.exports = (app) => {

app.get('/', (req, res) => {
    console.log("test");
        //Fetch API data
        fetch('https://infoboard.mediehuset.net/api/')
        //parse data as json
        .then(response => response.json())
        //Array data
        .then(data => {
            const shownews = data.news;

            //Render til EJS side
            res.render('../views/pages/index', {
                sd: "Test1",
                content: "Test2"
            });
        })
    });
    
}

