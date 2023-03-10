import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";

import {
  ref, child, get, getDatabase, set
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";


const firebaseConfig = {
  apiKey: "AIzaSyD04Qf12qgRAf7Joburgt5v4UJwEitY0fk",
  authDomain: "its-worth-a-shot.firebaseapp.com",
  databaseURL: "https://its-worth-a-shot-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "its-worth-a-shot",
  storageBucket: "its-worth-a-shot.appspot.com",
  messagingSenderId: "613566342054",
  appId: "1:613566342054:web:fea46a561de70eaf342567"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const db = getDatabase(app);

const playerStatsRef = ref(db, "playerStats");
getPlayerStatsData();

let playerCount = 0;

//get player stats
function getPlayerStatsData(){
  get(playerStatsRef)
    .then((snapshot)=>{//retrieve a snapshot of the data using a callback
      if (snapshot.exists()){//if the data exist
        try{
        //to get the average time worked by the player

            //get the total time worked from playerstats
            let totalTimeWorked = 0;
            snapshot.forEach((childSnapshot) => {
            var playerStatsData = new Object();
            playerStatsData.totalTimeWorked = childSnapshot.child("totalTimeWorked").val();
            console.log("Total Time Worked: " + childSnapshot.child("totalTimeWorked").val());

            //calculate average time worked from total time worked data
            var averageTimeWorked = totalTimeWorked / playerCount;
            console.log("Average Time Worked: " + averageTimeWorked);
            document.getElementById("average-time-worked").innerHTML = totalTimeWorked.toString();
          })
        }
        catch (error) {
          //print out error in console if getting player stats data is unsuccessful
          console.log("Error getPlayerStatsData" + error);
        }
      }
      else {
        console.log("No data available");
      };
    });
} 
const playerRef = ref(db, "players");
getPlayerData();

function getPlayerData() {
  //PlayerRef is declared at the top using a constant
  get(playerRef)
    .then((snapshot) => {//retrieve a snapshot of the data using a callback
      if (snapshot.exists()) {//if the data exist
        try {
        //to get total number of players today
        //to get number of active players today
        //to get number of new players today
        //to get print out data in table: username, email, created on, last logged in, active status
          let data = [];
          let activePlayerCount = 0;
          let newPlayerCount = 0;  

          snapshot.forEach((childSnapshot) => {
            //looping through each snapshot
            
            // Creating object for each player, storing username, createdon, lastloggedin, and status
            var playerData = new Object();
            playerData.userNametemp = childSnapshot.child("userName").val() + ": " + childSnapshot.child("email").val();

            // Get CreatedOn Timestamp from firebase
            const createdOntemp = childSnapshot.child("createdOn").val();
            // Convert Created On Timestmap to readable time
            var createdOnString = new Date(createdOntemp*1000);
            // Convert readable time to date (dd MMM yyyy)
            playerData.createdOn = createdOnString.toDateString();
            console.log(createdOnString);

            // Get lastLoggedIn Timestamp from firebase
            const lastLoggedIntemp = childSnapshot.child("lastLoggedIn").val();
            // Convert lastLoggedIn timestamp to readable time
            var lastLoggedInString = new Date(lastLoggedIntemp*1000);
            // Convert Readable time to date (dd MMM yyyy)
            playerData.lastLoggedIn = lastLoggedInString.toDateString();

            //converting active bool status (true/false) to online or offline
            if (childSnapshot.child("active").val() == true)
            {
              playerData.active = "Online";
            }
            else{
              playerData.active = "Offline";
            }

            // Add playerData object to data array
            data.push(playerData);
            console.log(childSnapshot);

            //Get current date in same format as Created On date
            console.log("Created On Date: " + playerData.createdOn);
            console.log("Current Date: " + new Date().toDateString());

            //Add number of players today
            if (playerData.createdOn == new Date().toDateString())
            {
              newPlayerCount++;
            }

            // Add number of active players
            if (playerData.active == true)
            {
              activePlayerCount++;
            }
            //add total number of players
            if (typeof playerData != "undefined")
            {
              playerCount++;
            }
          
            // Console log each child element
            console.log("User key: " + childSnapshot.key);
            console.log("Username: " + childSnapshot.child("userName").val());
            console.log("GetPlayerData: childkey " + childSnapshot.key);
            console.log("Email: " + childSnapshot.child("email").val());
            console.log("Created On: " + childSnapshot.child("createdOn").val());
            console.log("Last Logged In: " + childSnapshot.child("lastLoggedIn").val());
            console.log("Active Status: " + childSnapshot.child("active").val());
          });
          console.log(data);

          // Update Active Players Today
          document.getElementById("active-players-today").innerHTML = activePlayerCount.toString();

          //Update New Players Today
          document.getElementById("new-players-today").innerHTML = newPlayerCount.toString();

          //Update total players
          document.getElementById("total-players").innerHTML = playerCount.toString();
          
          /// Adding a header for player data table
          // Reference element with table id
          let myTable = document.querySelector('#table');
          // Create array for table headers
          let headers = ['Player', 'Created On', 'Last Logged In', 'Status'];

          // Create table element
          let table = document.createElement('table');
          // Create row element
          let headerRow = document.createElement('tr');

          // Create header text for each table header in headers array
          headers.forEach(headerText => {
            let header = document.createElement('th');
            let textNode = document.createTextNode(headerText);
            // Append header text to header row
            header.appendChild(textNode);
            headerRow.appendChild(header);
          });

          table.appendChild(headerRow);

          // Create text for each player data element in data array
          data.forEach(datael => {
            let row = document.createElement('tr');
            Object.values(datael).forEach(text =>{
              let cell = document.createElement('td');
              let textNode = document.createTextNode(text);
              cell.appendChild(textNode);
              row.appendChild(cell);  
            })
            table.appendChild(row);
          })

          myTable.appendChild(table);

          // Check for errors
        } catch (error) {
          console.log("Error getPlayerData" + error);
        }
      }
      else {
        console.log("No data available");
      };
    });
};//end getPlayerData

//write player data
function writePlayerData(userId, username, email, createdOn, loggedOn, active){
  const db = getDatabase
  set(ref(db, 'players' + userId), {
    username : username,
    email: email,
    createdOn: createdOn,
    loggedOn: loggedOn,
    active: active
  });
};

//write player stats data
function writePlayerStatsData(totalTimeWorked){
  const db = getDatabase
  set(ref(db, 'playerStats' + userId),{
    totalTimeWorked: totalTimeWorked
  });
};




