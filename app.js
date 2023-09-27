const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const mongoDbUsername = require("./util/secrets").mongoDbUsername;
const mongoDbPassword = require("./util/secrets").mongoDbPassword;

const errorController = require("./controllers/error");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("6514a1f2b8081105760bbe4f")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    `mongodb+srv://${mongoDbUsername}:${mongoDbPassword}@cluster0.mxuwfw1.mongodb.net/shop?retryWrites=true&w=majority`
  )
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "Jeff",
          email: "jeff@email.com",
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });
    app.listen(3000);
    console.log("Connected!!!");
  })
  .catch((err) => {
    console.log(err);
  });
