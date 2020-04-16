const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const register = require('./controllers/register.controller');
const signin = require('./controllers/signin.controller');
const profile = require('./controllers/profile.controller');
const image = require('./controllers/image.controller');

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.get("/", (req, res) => {
  res.json(databases.users);
});

app.post("/signin", signin.handleSignin);
app.post("/register", register.handleRegister);
app.get("/profile/:id", profile.handleGetProfile);
app.put("/image", image.handleImage);
app.post("/imageurl", image.handleApiCall);

app.listen(5000, () => {
  console.log("app is running on port 5000");
});
