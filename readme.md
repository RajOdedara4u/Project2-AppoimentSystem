<body>
    <header>
        <h1>Student-Teacher Appointment System</h1>
        <p><strong>Overview:</strong> This project implements a web-based appointment booking system for students and teachers, facilitating efficient scheduling and communication.</p>
        <p><strong>Firebase Backend Information:</strong> Utilizes Firebase Firestore for database storage, Firebase Authentication for user management, and Firebase Functions for server-side logic.</p>
    </header>
        <section>
        <h2>Pages:</h2>
        <h3>Student</h3>
        <ol>
            <li>Student Login</li>
            <li>Student Registration</li>
            <li>Send Appointment Page</li>
        </ol>
        <h3>Admin</h3>
        <ol>
            <li>Dashboard
                <ul>
                    <li>See All Appointments</li>
                    <li>Accept Appointment</li>
                    <li>Reject Appointment</li>
                </ul>
            </li>
            <li>Student Data Page
                <ul>
                    <li>See All Students</li>
                    <li>Accept Student Registration</li>
                    <li>Reject Student Registration</li>
                </ul>
            </li>
            <li>Teacher Data Page
                <ul>
                    <li>Add New Teacher</li>
                    <li>Edit Teacher Details</li>
                    <li>Delete Teacher</li>
                </ul>
            </li>
        </ol>
        <h3>Teacher</h3>
        <ol>
            <li>Login Page</li>
            <li>SuperAdmin Page
                <ul>
                    <li>See and Accept/Reject Appointments</li>
                </ul>
            </li>
        </ol>
    </section>
    <section>
        <h2>Notes:</h2>
        <ul>
            <li>After filling up the registration form, a student can only login when the admin accepts the registration request.</li>
            <li>When a student sends an appointment request, it includes information such as teacher name, date, time, message, and dynamically includes the student's name.</li>
        </ul>
    </section>
    <footer>
        <p>&copy; 2024 Your Company Name. All rights reserved.</p>
    </footer>
</body>
