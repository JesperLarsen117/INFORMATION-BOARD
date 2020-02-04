const express = require("express");
const app = express();
//Sørger for at vi kan læse post variabler
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("view engine", "ejs"); // Instrukser til express at der bruges ejs, som template sprog.

app.use(express.static(__dirname + "/"));

//Require config & route files
require("./routes/index")(app);


//Angiver port der skal lyttes på
app.listen(5000, () => {
  console.log("Express server kører... http://localhost:5000/");
});
