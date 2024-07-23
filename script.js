//  Firebase configuration object...
const firebaseConfig = {
  apiKey: "AIzaSyB2YLu49IDf0Hni8J0nClKH-_SQ0eOxZEk",
  authDomain: "project2-db-c565d.firebaseapp.com",
  databaseURL: "https://project2-db-c565d-default-rtdb.firebaseio.com",
  projectId: "project2-db-c565d",
  storageBucket: "project2-db-c565d.appspot.com",
  messagingSenderId: "426458494701",
  appId: "1:426458494701:web:f6f560a3ae890204a1bee4",
};

// initialize fire base
firebase.initializeApp(firebaseConfig);

// Reference to the database
const db = firebase.database();
const usersRef = db.ref("registerdStudents"); // Point to the node where registerd Stdent data is stored

// Function to handle login form submission
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  // Retriving Data From Input Field
  const email = getElement("StudentLogin1");
  const password = getElement("StudentLogin2");
  // Checking Variable Have the values or not..
  if (email && password) {
    // Query Firebase database to find matching user by contact
    usersRef
      .orderByChild("contact")
      .equalTo(email)
      .once("value", function (snapshot) {
        if (snapshot.exists()) {
          let userFound = false;
          snapshot.forEach(function (childSnapshot) {
            const userData = childSnapshot.val();
            const storedPassword = userData.password;

            // Check if passwords match
            if (password === storedPassword) {
              userFound = true;
              // Redirect to dashboard.html or another page upon successful login
              window.location.href = `./student/student.html?name=${userData.name}`;
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

// Utility function to get form input value
function getElement(id) {
  return document.getElementById(id).value;
}

// Function to show error message
function showError(message) {
  document.getElementById("error").innerHTML = message;
}
