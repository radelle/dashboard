import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  ref, child, get, getDatabase, set
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";


// Your web app's Firebase configuration
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

const playerRef = ref(db, "players");
getPlayerData();
function getPlayerData() {
  //const playerRef = ref(db, "players");
  //PlayerRef is declared at the top using a constant
  //get(child(db,`players/`))
  get(playerRef)
    .then((snapshot) => {//retrieve a snapshot of the data using a callback
      if (snapshot.exists()) {//if the data exist
        try {
          //let's do something about it
          var playerStats = document.getElementById("player-stats");
          let data = [];
          snapshot.forEach((childSnapshot) => {
            //looping through each snapshot
            //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
            
            // var table = document.getElementById("myTable");
            // var row = table.insertRow(0);
            // var cell1 = row.insertCell(0);
            // var cell2 = row.insertCell(1);
            var playerData = new Object();
            playerData.userNametemp = childSnapshot.child("userName").val() + ": " + childSnapshot.child("email").val();
            // childSnapshot.emailtemp = childSnapshot.child("email").val();
            playerData.createdOntemp = childSnapshot.child("createdOn").val();
            playerData.lastLoggedIntemp = childSnapshot.child("lastLoggedIn").val();
            playerData.active = childSnapshot.child("active").val();
            data.push(playerData);
            console.log(childSnapshot);
          
            console.log("User key: " + childSnapshot.key);
            console.log("Username: " + childSnapshot.child("userName").val());
            console.log("GetPlayerData: childkey " + childSnapshot.key);
            console.log("Email: " + childSnapshot.child("email").val());
            console.log("Created On: " + childSnapshot.child("createdOn").val());
            console.log("Last Logged In: " + childSnapshot.child("lastLoggedIn").val());
            // document.getElementById("displayName").innerHTML = childSnapshot.child("userName").val();
            // document.getElementById("displayEmail").innerHTML = childSnapshot.child("email").val();
            // document.getElementById("displayCreatedOn").innerHTML = childSnapshot.child("createdOn").val();
            // document.getElementById("displayLoggedIn").innerHTML = childSnapshot.child("lastLoggedIn").val();
            // document.getElementById("displayStatus").innerHTML = childSnapshot.child("active").val();
            // if (document.getElementById("displayStatus").innerHTML == "true")
            // {
            //   console.log("User is active");
            //   document.getElementById("displayStatus").innerHTML = "Active";
            // }
            // else
            // {
            //   console.log("User is inactive");
            //   document.getElementById("displayStatus").innerHTML = "Offline";
            // };

            // const playerRow = [document.getElementById("displayName").innerHTML + document.getElementById("displayEmail").innerHTML +
            // document.getElementById("displayCreatedOn").innerHTML + document.getElementById("displayLoggedIn").innerHTML +
            // document.getElementById("displayStatus").innerHTML];

            let tableBody = document.querySelector('#tbody');



            //console.log("Each table row: " + playerRow);

            // document.getElementById("displayRow").innerHTML = playerRow;

            //console.log("Player Stats: " + playerStats)
          });
          console.log(data);
          
          let myTable = document.querySelector('#table');
          let headers = ['Player', 'Created On', 'Last Logged In', 'Status'];

          let table = document.createElement('table');
          let headerRow = document.createElement('tr');

          headers.forEach(headerText => {
            let header = document.createElement('th');
            let textNode = document.createTextNode(headerText);
            header.appendChild(textNode);
            headerRow.appendChild(header);
          });

          table.appendChild(headerRow);

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


          //update our table content
          //playerStats.innerHTML = stats;
        } catch (error) {
          console.log("Error getPlayerData" + error);
        }
      }
      else {
        console.log("No data available");
      };
    });
};//end getPlayerData

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

function playerAdd()
{
  childSnapshot.child("userName").val() = username;
  const stats = [username];
  console.log(username);
};

