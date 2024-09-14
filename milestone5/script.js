// Get references to the form and display area
var form = document.getElementById('resume-form');
var resumeDisplayElement = document.getElementById('resume-display');
var shareableLinkContainer = document.getElementById('shareable-link-container');
var shareableLinkElement = document.getElementById('shareable-link');
var downloadPdfButton = document.getElementById('download-pdf');
// Handle form submission
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent page reload
    // Collect input values
    var username = document.getElementById('username').value.trim();
    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var phone = document.getElementById('phone').value.trim();
    var education = document.getElementById('education').value.trim();
    var experience = document.getElementById('experience').value.trim();
    var skills = document.getElementById('skills').value.trim();
    // Validate the input values
    if (!username || !name || !email || !phone) {
        alert('Please fill in all required fields.');
        return;
    }
    // Save form data in localStorage with the username as the key
    var resumeData = {
        name: name,
        email: email,
        phone: phone,
        education: education,
        experience: experience,
        skills: skills
    };
    localStorage.setItem(username, JSON.stringify(resumeData)); // Saving the data locally
    // Generate the resume content dynamically
    var resumeHTML = "\n        <style>\n            body {\n                font-family: Arial, sans-serif;\n                margin: 20px;\n            }\n            .resume-container {\n                max-width: 800px;\n                margin: auto;\n                border: 1px solid #ddd;\n                padding: 20px;\n                border-radius: 5px;\n            }\n            .resume-header {\n                text-align: center;\n                margin-bottom: 20px;\n            }\n            .resume-header h1 {\n                margin: 0;\n                font-size: 24px;\n            }\n            .section {\n                margin-bottom: 20px;\n            }\n            .section h2 {\n                margin: 0;\n                font-size: 20px;\n                border-bottom: 1px solid #ddd;\n                padding-bottom: 10px;\n            }\n            .section p {\n                margin: 5px 0;\n            }\n            .section p b {\n                font-weight: bold;\n            }\n        </style>\n        <div class=\"resume-container\">\n            <div class=\"resume-header\">\n                <h1>".concat(name, "</h1>\n                <p><b>Email:</b> ").concat(email, "</p>\n                <p><b>Phone:</b> ").concat(phone, "</p>\n            </div>\n            <div class=\"section\">\n                <h2>Education</h2>\n                <p>").concat(education, "</p>\n            </div>\n            <div class=\"section\">\n                <h2>Experience</h2>\n                <p>").concat(experience, "</p>\n            </div>\n            <div class=\"section\">\n                <h2>Skills</h2>\n                <p>").concat(skills, "</p>\n            </div>\n        </div>\n    ");
    // Display the generated resume
    resumeDisplayElement.innerHTML = resumeHTML;
    // Generate a shareable URL with the username only
    var shareableURL = "".concat(window.location.origin, "?username=").concat(encodeURIComponent(username));
    // Display the shareable link
    shareableLinkContainer.style.display = 'block';
    shareableLinkElement.href = shareableURL;
    shareableLinkElement.textContent = shareableURL;
});
// Handle PDF download
downloadPdfButton.addEventListener('click', function () {
    window.print(); // This will open the print dialog and allow the user to save as PDF
});
// Prefill the form based on the username in the URL
window.addEventListener('DOMContentLoaded', function () {
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get('username');
    if (username) {
        // Autofill form if data is found in localStorage
        var savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            var resumeData = JSON.parse(savedResumeData);
            document.getElementById('username').value = username;
            document.getElementById('name').value = resumeData.name;
            document.getElementById('email').value = resumeData.email;
            document.getElementById('phone').value = resumeData.phone;
            document.getElementById('education').value = resumeData.education;
            document.getElementById('experience').value = resumeData.experience;
            document.getElementById('skills').value = resumeData.skills;
        }
    }
});
