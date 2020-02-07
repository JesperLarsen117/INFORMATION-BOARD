// local time
function startTime() {
  let today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  h = checkTime(h);
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById("localTime").innerHTML = h + ":" + m;
  let t = setTimeout(startTime, 500);
}
function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  } // add zero in front of numbers < 10
  return i;
}
// local time

const rooms = document.getElementsByClassName("room");
for (let i = 0; i < rooms.length; i++) {
  // Tilføjer de rigtige klasse nummere til alle html elementerne.
  rooms[i].innerHTML = `<p class="classNumber">${rooms[i].dataset.room}</p>`;
}
setInterval(() => {
const request = async () => {
  const response = await fetch("/data");
  // laver response om til json format.
  const json = await response.json();

  // laver response om til variabler, så de er nemmere at tilgå.
  const colors = json.information.colors;
  const classnr = json.information.classnr;
  const names = json.information.names;
  const classNames = json.information.classNames;
  const time = json.information.time;

  const classRoom = document.getElementsByClassName("room");
  // kører addColorAndText functionen. Linje: 42
  // addColorAndText(rooms, classnr, names, classNames, time);

  const classRooms = document.getElementsByClassName('room')
  for (let i = 0; i < classRooms.length; i++) {
    const element = classRooms[i];
    element.innerHTML = `<p class="classNumber">${element.dataset.room}</p>`;
    element.className = "room " + element.dataset.room;
    
  }
  addColorAndText(rooms, classnr, names, classNames, time);
};
request();

// Tilføjer farverne og teksten i hver klasse.
function addColorAndText(classRoomElement, classNumber, name, className, time) {
  for (var i = 0; i < classRoomElement.length; i++) {
    if (classNumber[i] != undefined || className[i] != undefined || name[i] != undefined || time[i] != undefined || className[i] != undefined ) {
      document.getElementsByClassName(classNumber[i])[0].innerHTML = `
      <p class="classNumber">${classNumber[i]}</p>
      <p class="className">${className[i]}</p>
      <p class="classType">${name[i]}</p>
      <p class="classTime">${time[i]}</p>`;
      document.getElementsByClassName(classNumber[i])[0].className =
        "room " + classNumber[i] + " " + chooseColors(className[i]);
  }
}
}

// Vælger farver ud fra klasse.
const chooseColors = className => {
  // søger efter nogen bestemte bugstaver i className. og returnere en værdig ud fra resultatet. 
  let education = (className.search("we") > -1) ? "WU" :
                  (className.search("dm") > -1) ? "DM" : 
                  (className.search("mg") > -1) ? "MG" :
                  (className.search("brob") > -1) ? "BB" :
                  (className.search("a") > -1) ? "" :
                  (className.search("gr") > -1) ? "GT" : ""
// Bruger education(variable) til at beslutte hvilke farver der skal returneres.
  switch (education) {
    case "DM":
      return "greenColor";
      break;
    case "GT":
      return "blueColor";
      break;
    case "MG":
      return "magenta";
      break;
    case "WU":
      return "redColor";
      break;
      case "BB":
        return "orangeColor";
        break;
    default:
      return "darkGreyColor";
      break;
  }
};

// Reloader side hvert minut.

}, 1000);


const news = document.getElementsByClassName('insideNews')[0]
const news1 = document.getElementsByClassName('news-sections')[0]
const news2 = document.getElementsByClassName('news-sections')[1]
console.log(news1.clientHeight);

let isAtTop = false
let timeToWait = 4000;

if (news1.clientHeight >= 300) {
  console.log("this is a large article");
  news1.style.transform = `translateY(-${news1.clientHeight - 300}px)`;
  isAtTop = true
  timeToWait = 45000 
}

if (news2.clientHeight >= 300) {
  console.log("this is a large article");
  news2.style.transform = `translateY(-${news2.clientHeight - 300}px)`;
  isAtTop = true
  timeToWait = 45000 

}

setInterval(() => {
  if (isAtTop == true) {
    timeToWait = 45000
    console.log('at top');
    news1.style.transform = `translateY(0px)`;
    news2.style.transform = `translateY(0px)`;
    isAtTop = false;
    news1.classList = "news-sections-up";
    news2.classList = "news-sections-up";

  } else {
    if (news1.clientHeight >= 300) {
      timeToWait = 2000 
      console.log("this is a large article");
      news1.classList = "news-sections";
      news1.style.transform = `translateY(-${news1.clientHeight - 300}px)`; 

    }
    if (news2.clientHeight >= 300) {
      timeToWait = 2000 
      news2.style.transform = `translateY(-${news2.clientHeight- 300}px)`;
      isAtTop = true;
      news2.classList = "news-sections";
  }
  }
}, timeToWait);

// h1 58,8
// all 856,19



