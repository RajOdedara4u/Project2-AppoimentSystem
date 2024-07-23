import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";

//  web app's Firebase configuration
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
let teacherdta = firebase.database().ref("teacher-data");

// Initialize Firebase

const getElement = (id) => document.getElementById(id).value;

// refrence db

// Function to handle login form submission
document.getElementById("adminLogin").addEventListener("submit", function (e) {
  e.preventDefault();
  const code = getElement("authantication_code");
  const name = getElement("Tname");
  if (name && code) {
    // Query Firebase database to find matching user by name
    teacherdta
      .orderByChild("TName")
      .equalTo(name)
      .once("value", function (snapshot) {
        if (snapshot.exists()) {
          let userFound = false;
          snapshot.forEach(function (childSnapshot) {
            const userData = childSnapshot.val();
            const storedPassword = userData.code;
            // Check if passwords match
            if (code === storedPassword && code != "0001") {
              userFound = true;
              // Redirect to dashboard.html or another page upon successful login
              window.location.href = `./superAdminPanel.html?name=${name}`; // if the user is admin it redirect to main panel url
            } else if (name == "Admin@123" && code === "0001") {
              window.location.href = "./adminPanel.html?role=admin";
            }
          });

          if (!userFound) {
            showError("Invalid password");
          }
        } else {
          showError("User not found");
        }
      });
  } else {
    showError("Please fill in all fields");
  }
});

// Function to show error message
function showError(message) {
  document.getElementById("error").innerHTML = message;
}
