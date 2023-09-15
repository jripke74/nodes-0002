const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const secrets = require("./secrets");

let _db;

const mongoConnect = () => {
  MongoClient.connect(
    `mongodb+srv://jeff:${secrets.mongoDbPassword}@cluster0.delsao3.mongodb.net/shop?retryWrites=true&w=majority`
  )
    .then((client) => {
      console.log("Connected!!!", client);
      _db = client.db();
      // callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
