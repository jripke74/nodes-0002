const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const secrets = require("./secrets");

const mongoConnect = () => {
  MongoClient.connect(
    `mongodb+srv://jeff:${secrets.mongoDbPassword}@cluster0.delsao3.mongodb.net/shop?retryWrites=true&w=majority`
  )
    .then((client) => {
      console.log("Connected!!!");
      callback(client);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = mongoConnect;