const express = require("express");
const connectDB = require("./db");
const router = require("./router");
const session = require("cookie-session");
const app = express();
const MongoStore= require("connect-mongo")
const flash=require("connect-flash")
// Database Connect
connectDB();

let sessionOptions = session({
  secret: "JS is so cool",
  resave: false,
  saveUninitialzed: true,
  cookies: { maxAge: 24 * 60 * 60 * 1000, httpOnly: true },
  // store: new MongoStore.create({mongo_Url})

});
app.use(flash())
app.use(sessionOptions);

// Static Files
app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));

app.use(express.json())


app.use("/", router)

app.set("views", "views")
app.set("view engine", "ejs")

app.listen(3000, () => {
  console.log(`Server listening at http://localhost:3000`)
})
