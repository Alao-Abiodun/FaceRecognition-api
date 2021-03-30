const express = require("express");
const cors = require("cors");

const register = require('./controllers/register.controller');
const signin = require('./controllers/signin.controller');
const profile = require('./controllers/profile.controller');
const image = require('./controllers/image.controller');

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => { res.send('It is working!'); });
app.post("/signin", signin.handleSignin);
app.post("/register", register.handleRegister);
app.get("/profile/:id", profile.handleGetProfile);
app.put("/image", image.handleImage);
app.post("/imageurl", image.handleApiCall);

app.listen(process.env.PORT || 5000, () => {
  console.log(`app is running on port ${process.env.PORT}`);
});
