document.addEventListener("DOMContentLoaded", () => {
    // Switch between Sign-Up and Sign-In forms
    document.getElementById("show-sign-up").addEventListener("click", () => {
        document.querySelector(".sign-up-box").style.display = "block";
        document.querySelector(".sign-in-box").style.display = "none";
    });

    document.getElementById("show-sign-in").addEventListener("click", () => {
        document.querySelector(".sign-in-box").style.display = "block";
        document.querySelector(".sign-up-box").style.display = "none";
    });

    // Handle Sign-Up Form Submission
    const signUpForm = document.getElementById("sign-up-form");
    signUpForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent the form from submitting normally

        // Get the username, email, and password
        const username = document.getElementById("sign-up-username").value;
        const email = document.getElementById("sign-up-email").value;
        const password = document.getElementById("sign-up-password").value;

        // Store credentials in localStorage
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);

        alert(`Welcome, ${username}! Your account has been created.`);
        document.getElementById("show-sign-in").click(); // Switch to Sign-In form
    });

    // Handle Sign-In Form Submission
    const signInForm = document.getElementById("sign-in-form");
    signInForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent the form from submitting normally

        // Get the email and password
        const email = document.getElementById("sign-in-email").value;
        const password = document.getElementById("sign-in-password").value;

        // Validate credentials
        const storedEmail = localStorage.getItem("email");
        const storedPassword = localStorage.getItem("password");

        if (email === storedEmail && password === storedPassword) {
            alert(`Welcome back, ${localStorage.getItem("username")}!`);
            window.location.href = "index.html"; // Redirect to home page
        } else {
            alert("Invalid credentials, please try again.");
        }
    });
});
