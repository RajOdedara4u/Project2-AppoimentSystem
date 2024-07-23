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
let project2db = firebase.database().ref("project2-db");

const getElement = (id) => document.getElementById(id).value;

const submited = (e) => {
  e.preventDefault();
  var Sname = getElement("StudentName");
  var StudentContact = getElement("StudentContact");
  var StudentRollNo = getElement("StudentRollNo");
  var StudentDepartment = getElement("StudentDepartment");
  var StudentPassword = getElement("StudentPassword");
  var StudentConPassword = getElement("StudentConPassword");

  // condition for all fields have value's
  StudentContact &&
  StudentRollNo &&
  StudentDepartment &&
  StudentPassword &&
  Sname &&
  StudentConPassword
    ? StudentPassword === StudentConPassword
      ? SaveData(
          // when all data is avalable then we call this function to store data into  database
          Sname,
          StudentContact,
          StudentDepartment,
          StudentRollNo,
          StudentPassword
        )(
          ((document.getElementById("success").innerHTML = // success message on data sended
            " Registration Successfull"),
          (window.location.href = `/index.html`),
          (document.getElementById("error").innerHTML = ""))
        )
      : (document.getElementById("error").innerHTML =
          " * Passwords are not matched") // when both password's are not matched
    : (document.getElementById("error").innerHTML =
        " * Please FullFill All Field"); // whem some field is empty
};

// this function will store or send data to database
const SaveData = (
  Sname,
  StudentContact,
  StudentDepartment,
  StudentRollNo,
  StudentPassword
) => {
  var newStudentdata = project2db.push();

  newStudentdata.set({
    name: Sname,
    contact: StudentContact,
    department: StudentDepartment,
    Roll_no: StudentRollNo,
    Password: StudentPassword,
  });
};
document.getElementById("registerForm").addEventListener("submit", submited);
