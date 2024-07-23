// Getting username from url parameters
const urlParams = new URLSearchParams(window.location.search); // getting url into variable
const username = urlParams.get("role"); // retriving the data

// Update welcome message
const welcomeDiv = document.getElementById("Welcome");
welcomeDiv.textContent = `${username}`;

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

// refrence db
let TeacherD = firebase.database().ref("teacher-data");

function fetchData() {
  TeacherD.once("value", function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      var data = childSnapshot.val();
      var TName = data.TName;
      var Subject = data.subject;
      var TCode = data.code;

      // Create a new row
      var newRow = document.createElement("tr");
      newRow.innerHTML = `
<td>${TCode}</td>
<td>${TName}</td>
<td>${Subject}</td>
`;

      // Append the new row to the table body
      document.getElementById("TeacheTableBody").appendChild(newRow);
    });
  });
}

// Call fetchData once when the page loads
fetchData();

const getElement = (id) => document.getElementById(id).value;
// Function to handle delete teacher form submission
function deleteTeacher(e) {
  e.preventDefault();

  var Tname = getElement("DTname");
  var code = getElement("Dauthantication_code");
  // Check if required fields are filled
  if (Tname && code) {
    // Call Firebase function to delete teacher
    deleteTeacherData(Tname, code);
  } else {
    document.getElementById("errorD").innerHTML = "* Please fill in all fields";
  }
}

// Function to delete teacher data from Firebase
function deleteTeacherData(Tname, code) {
  // Reference to the database node where teacher data is stored
  let teacherRef = firebase.database().ref("teacher-data");

  // Find the specific teacher record using query (assuming name and code are unique identifiers)
  teacherRef
    .orderByChild("TName")
    .equalTo(Tname)
    .once("value", function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        var key = childSnapshot.key;

        // Delete the specific record from the database
        teacherRef.child(key).remove();

        // Display success message
        document.getElementById("successD").innerHTML =
          "Teacher deleted successfully";

        // Optionally, clear input fields
        document.getElementById("DTname").value = "";
        document.getElementById("Dauthantication_code").value = "";
      });
    });
}

// Event listener for form submission
document
  .getElementById("DelateTeacher")
  .addEventListener("submit", deleteTeacher);
