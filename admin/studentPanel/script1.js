// Retrieve username from query parameters
const urlParams = new URLSearchParams(window.location.search); // Getting url
const username = urlParams.get("role"); // getting value of variable
// Update welcome message
const welcomeDiv = document.getElementById("Welcome");
welcomeDiv.textContent = ` ${username}`;

// web app's Firebase configuration
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

// -----------------------------------------------Fetching Pending Requests..
// creating refrence of data base
let project2db = firebase.database().ref("project2-db");

// fetching data from data base and adding row's into html table
function fetchData() {
  project2db.once("value", function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      var data = childSnapshot.val();
      //getting data from data object into variables
      var rollNo = data.Roll_no;
      var name = data.name;
      var contact = data.contact;
      var department = data.department;
      var password = data.Password;

      // Create a new row element
      var newRow = document.createElement("tr");
      newRow.innerHTML = `
<td>${rollNo}</td>
<td>${name}</td>
<td>${contact}</td>
<td>${department}</td>
<td>${password}</td>
<button style="padding-left:13px; padding-right:13px; border-radius:30px;  font-weight: 700;  background-color:green; color:white;" onClick="AcceptS('${rollNo}','${name}','${contact}','${department}','${password}')"  >Accept</button> / <button style="padding-left:13px; padding-right:13px; border-radius:30px;  font-weight: 700; background-color:red; color:white;" onClick="RejectedS('${rollNo}','${contact}')">Reject</button></td>
`;

      // Adding the new row to the table body
      document.getElementById("studentTableBody").appendChild(newRow);
    });
  });
}

// Call fetchData once when the page loads for get all data
fetchData();

// function for Show registerd students  table
function showAStudents() {
  let Astudent = firebase.database().ref("registerdStudents");
  Astudent.once("value", function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      var data = childSnapshot.val();
      var rno = data.rno;
      var name = data.name;
      var contact = data.contact;
      var depart = data.department;
      var pass = data.password;

      // Create a new row
      var newRow = document.createElement("tr");
      newRow.innerHTML = `
<td>${rno}</td>
<td>${name}</td>
<td>${contact}</td>
<td>${depart}</td>
<td>${pass}</td>
`;
      // Append the new row to the table body
      document.getElementById("aprovedTableBody").appendChild(newRow);
    });
  });
}
showAStudents();
