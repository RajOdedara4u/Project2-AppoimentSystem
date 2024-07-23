// Retrieve username from query parameters
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get("name");

// Update welcome message
const welcomeDiv = document.getElementById("Welcome");
welcomeDiv.textContent = `${username}`;

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2YLu49IDf0Hni8J0nClKH-_SQ0eOxZEk",
  authDomain: "project2-db-c565d.firebaseapp.com",
  databaseURL: "https://project2-db-c565d-default-rtdb.firebaseio.com",
  projectId: "project2-db-c565d",
  storageBucket: "project2-db-c565d.appspot.com",
  messagingSenderId: "426458494701",
  appId: "1:426458494701:web:f6f560a3ae890204a1bee4",
};

// init databse
firebase.initializeApp(firebaseConfig);

// refrence db

// Initialize Firebase

const getElement = (id) => document.getElementById(id).value;

// creating refrence of all teacher data container in db
let TeacherD = firebase.database().ref("teacher-data");

// function for getting all teacher's name and show into option field line by line
function fetchData() {
  TeacherD.once("value", function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      var data = childSnapshot.val();
      var TName = data.TName;
      var Subject = data.subject;

      // Create a new row
      if (TName !== "Admin@123") {
        // seprate the admin
        var newRow = document.createElement("option");
        newRow.innerHTML = `
 <option>${TName}</option>
 `;
        // Append the new row to the table body
        document.getElementById("Tname").appendChild(newRow);
      }
    });
  });
}
// Call fetchAndPopulateTable once when the page loads
fetchData();

// refrence of all appoimen's db
let Appoiment = firebase.database().ref("appoiment");

// function for store or send data to db
const SaveData = (Sname, Tname, Date, Message, Time) => {
  var newAppoiment = Appoiment.push();

  newAppoiment.set({
    StudentName: Sname,
    TeacherName: Tname,
    Date: Date,
    Message: Message,
    Time: Time,
  });
};

// function for get data from client side and send to another function
const sendAppoiment = (e) => {
  e.preventDefault();

  const Sname = username;
  const Tname = getElement("Tname");
  const Datee = getElement("Date");
  const Message = getElement("msg");
  const Time = getElement("Time");
  Sname && Tname && Datee && Message && Time //checking all field's are avalable
    ? SaveData(
        Sname,
        Tname,
        Datee,
        Message,
        Time
      )(
        ((document.getElementById("success").innerHTML = "Success..."),
        (document.getElementById("error").innerHTML = ""))
      )
    : (document.getElementById("error").innerHTML =
        " * Please FullFill All Field");
};
document
  .getElementById("appoimentForm")
  .addEventListener("submit", sendAppoiment); // sendAppoiment function fire on form submission
