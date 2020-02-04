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
          colors.push(chooseColors(element.name));
          classnr.push(element.classroom);
        }
        const information = {
          colors: colors,
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
    let names = [];
    let classNames = [];
    let time = [];




    const schedule_hours = [
      { start: 29700, stop: 33599 }, //8:15 - 9:20
      { start: 33600, stop: 38799 }, //9:20 - 10:30 (9:15)
      { start: 37800, stop: 41399 }, //10:30 - 11:30
      { start: 41400, stop: 46799 }, //12:00 - 13:00
      { start: 46800, stop: 50399 }, //13:00 - 14:00
      { start: 50400, stop: 54900 }, //14:00 - 15:15
  ]
    
    // Henter dags dato og tid
    const date = new Date(); 
    // Konverterer dags datotid til timestamp
    const curtime = ~~(date.getTime()/1000);
    // const curtime = (new Date(date.getFullYear(), date.getMonth(), date.getDate()+1, 8, 15, 0).getTime()/1000);

    // Sætter dags datotid til dagens begyndelse (Kl. 00:00:00)
    const curdate = (new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0).getTime()/1000);
    
    // Deklarerer array til aktuel datos skematider
    const curdate_hours = [];
    
    // Looper skematider
    schedule_hours.forEach(obj => {
      // Sætter skematider på aktuel dato
      curdate_hours.push({
          start: curdate + obj.start, 
          stop: curdate + obj.stop
      });
      
    });  
    // Tjekker om nutid findes i aktuel datos skematider
    const curhour = curdate_hours.filter(obj => obj.start <= curtime && obj.stop >= curtime);
    
    // Deklarerer temporary array til aktuelle aktiviteter
    let temp_list = [];
    
    // Hvis nutid er i skematider...
    if(curhour.length) {
      // Filtrer fetch data efter hvilke skematider nutid befinder sig i
        

 
      temp_list = await activity.filter(item => item.stamp >= curhour[0].start && item.stamp < curhour[0].stop);
      

      // console.log(temp_list);
      for (let i = 0; i < temp_list.length; i++) {
        const element = temp_list[i];
        names.push(element.name);
        classnr.push(element.classroom);
        classNames.push(element.class);
        time.push(element.time);
    }

    const information = {
      classnr,
      names,
      classNames,
      time
    };
      return res.json({ information });

    } else {
      // Træk første index ud af fetch data
      const firstkey = activity.find(Boolean);
      // Hent data der passer i næstkommende skoledags første skematid (8:15 - 9:20)
      temp_list = await activity.filter(item => item.stamp <= (firstkey.stamp+3899));      
    }
    
    // Deklarerer array til endelig liste
    const activity_list = [];
    
    // Lopper arrayet for at behandle data 
    // fikse titel efter om feltet friendly name
    // er tomt eller ej
    temp_list.forEach(element => {
      //console.log(element.stamp);
    
      // Fikser titel...
      element.friendly_name = (!element.friendly_name) ? element.name : element.friendly_name;
    
      // Tilføjer key/values til ny liste
      activity_list.push(element);
    });
    
    
    









  });
};

const chooseColors = className => {
  switch (className) {
    case "Digital media":
      return "greenColor";
      break;
    case "Graf.tekn.":
      return "blueColor";
      break;
    case "Mediegrafiker":
      return "magenta";
      break;
    case "Webudvikler":
      return "redColor";
      break;
    default:
      return "default";
      break;
  }
};

