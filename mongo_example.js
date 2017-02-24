"use strict";

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  // ==> We have a connection to the "test-tweets" db,
  //     starting here.

  console.log(`Connected to mongodb: ${MONGODB_URI}`);

  // ==> Let's "get all the tweets". In Mongo-speak, we "find" them.
  db.collection("tweets").find().toArray((err, results) => {
    // Lazy error handling:
    if (err) throw err;

    // console.log("find result: ", results);
    // console.log("type of find result: ", typeof results);

    // ==> Fair warning: This is going to log a lot of stuff...
    // console.log("for each item yielded by the cursor:");
    // results.each((err, item) => console.log(" ", item));

    // results.toArray((err, resultsArray) => {
    //   if (err) throw err;

      console.log("results.toArray:", results);
    // });
    // ==> This is inside this callback now. Think about it:
    // This is now the "end of the program", right? Yes

    // ==> At the end, we close the connection:
    db.close();
  });
});
