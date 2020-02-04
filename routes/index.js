const express = require("express");
const app = express();
const fetch = require("node-fetch");

module.exports = app => {
  app.get("/", async (req, res) => {
    //Fetch API data
    fetch("https://infoboard.mediehuset.net/api/")
      //parse data as json
      .then(response => response.json())
      //Array data
      .then(data => {
        const shownews = data.news;
        const showActivity = data.activity;
        const classnr = [];
        const colors = [];
        for (let i = 0; i < showActivity.length; i++) {
          const element = showActivity[i];
          classnr.push(element.classroom);
        }
        const information = {
          classnr
        };
        //Render til EJS side
        res.render("../views/pages/index", {
          nyhedertitle: "Nyheder",
          videotitle: "Video",
          aktivitetertitle: "Aktiviteter",
          news: shownews,
          activity: showActivity,
          uddanelseColor: information
        });
      });
  });

  app.get("/data", async (req, res) => {
    const data = await (
      await fetch("https://infoboard.mediehuset.net/api/")
    ).json();
    const activity = data.activity;
    const classnr = [];
    const names = [];
    const classNames = [];
    const time = [];

      for (let i = 0; i < activity.length; i++) {
        const element = activity[i];
        const dateNow = new Date();
        const hourNow = dateNow.getHours();
        const minutNow = dateNow.getMinutes();
        
        const schoolDate = new Date(element.stamp * 1000)
        const schoolHour = schoolDate.getHours() -1;
        const schoolMinut = schoolDate.getMinutes();
        
        if (schoolHour == hourNow-1) {
            names.push(element.name);
            classnr.push(element.classroom);
            classNames.push(element.class);
            time.push(element.time);
        } else if(schoolHour == hourNow){
            names.push(element.name);
            classnr.push(element.classroom);
            classNames.push(element.class);
            time.push(element.time);
        } else if(hourNow >= 15 && schoolHour == 7 || hourNow < 8 && schoolHour == 7){
          names.push(element.name);
          classnr.push(element.classroom);
          classNames.push(element.class);
          time.push(element.time);
        }
    }
    const information = {
      classnr,
      names,
      classNames,
      time
    };
    // sender response til javascript fetch i json format.
      return res.json({ information });
      
  })
};