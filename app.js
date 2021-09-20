const express = require("express");
const { open } = require("sqlite");
const app = express();
const path = require("path");
const sqlite3 = require("sqlite3");
let db = null;
const dbPath = path.join(__dirname, "cricketMatchDetails.db");

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running On 3000 successfully..");
    });
  } catch (e) {
    console.log(`DB Error ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

app.get("/players/", async (request, response) => {
  const getPlayerDetails = `
    SELECT * 
    FROM player
    ORDER BY player_id`;

  const playerArray = await db.all(getPlayerDetails);
  response.send(playerArray);
});
