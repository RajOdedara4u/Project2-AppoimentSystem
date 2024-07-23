// Retrieve username from query parameters
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get("name");

// Update welcome message
const welcomeDiv = document.getElementById("Welcome");
welcomeDiv.textContent = `Welcome , ${username}`;

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

// creating the refrence of all apoiment container
let appoiment = firebase.database().ref("appoiment");

function fetchData() {
  appoiment.once("value", function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      var data = childSnapshot.val();
      var Sname = data.StudentName;
      var Tname = data.TeacherName;
      var message = data.Message;
      var Datee = data.Date;
      var Time = data.Time;
      console.log(Tname);
      let btn = `<button style="padding-left:13px; padding-right:13px; border-radius:30px;  font-weight: 700;  background-color:green; color:white;" onClick="AcceptA('${Sname}','${Tname}','${message}','${Datee}','${Time}')"  >Accept</button> / <button style="padding-left:13px; padding-right:13px; border-radius:30px;  font-weight: 700; background-color:red; color:white;" onClick="RejectedA('${Sname}','${Tname}')">Reject</button>`;
      // Create a new row
      var newRow = document.createElement("tr");
      newRow.innerHTML = `
<td>${Sname}</td>
<td>${Tname}</td>
<td>${message}</td>
<td>${Datee}</td>
<td>${Time}</td>
<td>${Tname == username ? btn : "No Permission"}</td>
`;

      // Append the new row to the table body
      document.getElementById("studentTableBody").appendChild(newRow);
    });
  });
}
// Call fetchData once when the page loads
fetchData();

let accAppoiment = firebase.database().ref("acceptedAppoiments");
function fetchAppoiments() {
  accAppoiment.once("value", function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      var data = childSnapshot.val();
      var Sname = data.StudentName;
      var Tname = data.Teacher;
      var message = data.Message;
      var Datee = data.Date;
      var Time = data.Time;
      var Stetus = data.Stetus;

      // Create a new row
      var newRow = document.createElement("tr");
      newRow.innerHTML = `
<td>${Sname}</td>
<td>${Tname}</td>
<td>${message}</td>
<td>${Datee}</td>
<td>${Time}</td>
<td style="color:green">${Stetus}</td>
`;

      // Append the new row to the table body
      document.getElementById("acceptedAppoimentsBody").appendChild(newRow);
    });
  });
}

// Call fetchData once when the page loads
fetchAppoiments();
