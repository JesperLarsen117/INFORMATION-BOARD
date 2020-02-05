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
        const dayNow = dateNow.getDay();
        const hourNow = dateNow.getHours();
        const minutNow = dateNow.getMinutes();
        
        const schoolDate = new Date(element.stamp * 1000)
        const tomorrowDate = new Date(element.stamp * 1000)
        const tomorrow = tomorrowDate.getDay();
        const schoolHour = schoolDate.getHours() -1;
        const schoolMinut = schoolDate.getMinutes();
        const schoolDays = schoolDate.getDay();
        // console.log(dayNow);
        // console.log(schoolDays == dayNow);
        // console.log(schoolDays);
        // console.log(schoolDays);
        
        if (tomorrow == dayNow +1) {
          // console.log(new Date(element.stamp).getDay());
        }
        
        
        
// console.log(schoolDay == dayNow +1);
          // console.log(new Date(element.stamp).getDay());
          // console.log(tomorrowDate.getDay());

        if (schoolHour == hourNow-1 && schoolDays == dayNow) {
          // console.log("asd");
          names.push(element.name);
                    // console.log(new Date(element.stamp * 1000).getDay());
            classnr.push(element.classroom);
            classNames.push(element.class);
            time.push(element.time);
        } else if(schoolHour == hourNow-1 && schoolDays == dayNow){
          // console.log('asd');
            names.push(element.name);
            classnr.push(element.classroom);
            classNames.push(element.class);
            time.push(element.time);
        } else if(hourNow >= 15 && schoolHour == 7 && tomorrow == dayNow +1 || hourNow <= 8 && schoolHour == 7 && tomorrow == dayNow){
          // console.log(element);
                    // console.log(new Date(element.stamp * 1000).getDay());

          // console.log(tomorrow == dayNow +1);
          // console.log(dayNow);          
          // console.log(tomorrow);
          
          
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