

function startTime() {
  let today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById("localTime").innerHTML = h + ":" + m + ":" + s;
  let t = setTimeout(startTime, 500);
}
function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  } // add zero in front of numbers < 10
  return i;
}

const rooms = document.getElementsByClassName("room");
for (let i = 0; i < rooms.length; i++) {
  rooms[i].innerHTML = `<p class="classNumber">${rooms[i].dataset.room}</p>`;
}
const request = async () => {
  const response = await fetch("/data");
  const json = await response.json();

  const colors = json.information.colors;
  const classnr = json.information.classnr;
  const names = json.information.names;
  const classNames = json.information.classNames;
  const time = json.information.time;

  const classRoom = document.getElementsByClassName("room");
  console.log(countClassNumber(rooms, classnr, names, classNames, time));

  console.log(countClassNumber(rooms, classnr, names, classNames, time));

};
request();

function countClassNumber(classRoomElement, classNumber, name, className, time) {
  for (var i = 0; i < classRoomElement.length; i++) {
    console.log(document.getElementsByClassName(classNumber[i])[0].innerHTML);
    document.getElementsByClassName(classNumber[i])[0].innerHTML = `
    <p class="classNumber">${classNumber[i]}</p>
    <p class="className">${className[i]}</p>
    <p class="classType">${name[i]}</p>
    <p class="classType">${time[i]}</p>`;

    document.getElementsByClassName(classNumber[i])[0].className =
      "room " + classNumber[i] + " " + chooseColors(name[i]);
  }
}

const chooseColors = className => {
  switch (className) {
    case "Digital media":
    case "grafik billeder":
      return "greenColor";
      break;
    case "Graf.tekn.":
    case "prod storf prin":
      return "blueColor";
      break;
    case "Mediegrafiker":
      return "magenta";
      break;
    case "Webudvikler":
    case "Programmering":
      return "redColor";
      break;
      case "brobygger":
        return "orangeColor";
        break;
    default:
      return "darkGreyColor";
      break;
  }
};


setInterval(() => {
  location.reload();
}, 10000);