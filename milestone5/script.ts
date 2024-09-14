// Get references to the form and display area
const form = document.getElementById('resume-form') as HTMLFormElement;
const resumeDisplayElement = document.getElementById('resume-display') as HTMLDivElement;
const shareableLinkContainer = document.getElementById('shareable-link-container') as HTMLDivElement;
const shareableLinkElement = document.getElementById('shareable-link') as HTMLAnchorElement;
const downloadPdfButton = document.getElementById('download-pdf') as HTMLButtonElement;

// Handle form submission
form.addEventListener('submit', (event: Event) => {
    event.preventDefault(); // Prevent page reload
    
    // Collect input values
    const username = (document.getElementById('username') as HTMLInputElement).value.trim();
    const name = (document.getElementById('name') as HTMLInputElement).value.trim();
    const email = (document.getElementById('email') as HTMLInputElement).value.trim();
    const phone = (document.getElementById('phone') as HTMLInputElement).value.trim();
    const education = (document.getElementById('education') as HTMLTextAreaElement).value.trim();
    const experience = (document.getElementById('experience') as HTMLTextAreaElement).value.trim();
    const skills = (document.getElementById('skills') as HTMLTextAreaElement).value.trim();
    
    // Validate the input values
    if (!username || !name || !email || !phone) {
        alert('Please fill in all required fields.');
        return;
    }

    // Save form data in localStorage with the username as the key
    const resumeData = {
        name,
        email,
        phone,
        education,
        experience,
        skills
    };
    localStorage.setItem(username, JSON.stringify(resumeData)); // Saving the data locally

    // Generate the resume content dynamically
    const resumeHTML = `
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 20px;
            }
            .resume-container {
                max-width: 800px;
                margin: auto;
                border: 1px solid #ddd;
                padding: 20px;
                border-radius: 5px;
            }
            .resume-header {
                text-align: center;
                margin-bottom: 20px;
            }
            .resume-header h1 {
                margin: 0;
                font-size: 24px;
            }
            .section {
                margin-bottom: 20px;
            }
            .section h2 {
                margin: 0;
                font-size: 20px;
                border-bottom: 1px solid #ddd;
                padding-bottom: 10px;
            }
            .section p {
                margin: 5px 0;
            }
            .section p b {
                font-weight: bold;
            }
        </style>
        <div class="resume-container">
            <div class="resume-header">
                <h1>${name}</h1>
                <p><b>Email:</b> ${email}</p>
                <p><b>Phone:</b> ${phone}</p>
            </div>
            <div class="section">
                <h2>Education</h2>
                <p>${education}</p>
            </div>
            <div class="section">
                <h2>Experience</h2>
                <p>${experience}</p>
            </div>
            <div class="section">
                <h2>Skills</h2>
                <p>${skills}</p>
            </div>
        </div>
    `;

    // Display the generated resume
    resumeDisplayElement.innerHTML = resumeHTML;

    // Generate a shareable URL with the username only
    const shareableURL = `${window.location.origin}?username=${encodeURIComponent(username)}`;
    
    // Display the shareable link
    shareableLinkContainer.style.display = 'block';
    shareableLinkElement.href = shareableURL;
    shareableLinkElement.textContent = shareableURL;
});

// Handle PDF download
downloadPdfButton.addEventListener('click', () => {
    window.print(); // This will open the print dialog and allow the user to save as PDF
});

// Prefill the form based on the username in the URL
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');

    if (username) {
        // Autofill form if data is found in localStorage
        const savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            const resumeData = JSON.parse(savedResumeData);
            (document.getElementById('username') as HTMLInputElement).value = username;
            (document.getElementById('name') as HTMLInputElement).value = resumeData.name;
            (document.getElementById('email') as HTMLInputElement).value = resumeData.email;
            (document.getElementById('phone') as HTMLInputElement).value = resumeData.phone;
            (document.getElementById('education') as HTMLTextAreaElement).value = resumeData.education;
            (document.getElementById('experience') as HTMLTextAreaElement).value = resumeData.experience;
            (document.getElementById('skills') as HTMLTextAreaElement).value = resumeData.skills;
        }
    }
});
