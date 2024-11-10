# :email: Phiserman - Phishing Email Detector

![Version](https://img.shields.io/badge/version-1.0-green) ![License](https://img.shields.io/badge/license-MIT-blue)

**Phiserman** is a Chrome Extension that detects potential phishing emails in Gmail and Outlook. It scans emails, highlights suspicious content, and provides an easy-to-use interface to start and stop scans.

---

## :sparkles: Features

- :shield: **Real-time Email Scanning**: Detects suspicious emails in Gmail and Outlook.
- :white_check_mark: **User-Friendly Interface**: Popup controls for scanning with dynamic progress feedback.
- :warning: **Visual Alerts**: Highlights flagged emails with a red border and warning message.

---

## :computer: Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/username/phiserman.git
   cd phiserman
Load the Extension in Chrome:
Open Chrome and navigate to chrome://extensions/
Enable Developer Mode
Click Load unpacked and select the phiserman project directory.
:hammer: Usage
Open Gmail or Outlook in your browser.
Click the Phiserman extension icon to open the popup.
Click Start Scanning to detect and highlight any suspicious emails in your inbox.
The extension will automatically highlight suspicious emails with a warning icon and red border.
:file_folder: Files Overview
Core Components
manifest.json: Specifies metadata, permissions, and settings for running the extension on Gmail and Outlook.

background.js: Activates a background listener that logs a message when Phiserman is installed.

javascript
Copy code
chrome.runtime.onInstalled.addListener(() => {
    console.log("Phiserman installed!");
});
Content Script
content.js:

Scans Gmail and Outlook emails for phishing content.
Receives messages from popup.js to initiate the scan.
Flags suspicious emails by adding a red border and warning text.
Example function for flagging emails:

javascript
Copy code
function flagEmail(emailElement) {
    emailElement.style.border = '2px solid red';
    const warning = document.createElement('div');
    warning.innerText = '⚠️ Suspicious Email Detected';
    warning.style.color = 'red';
    emailElement.prepend(warning);
}
User Interface Components
popup.html:

Provides the popup interface with controls to start and stop scanning.
Displays a progress bar and scan results for user feedback.
popup.js:

Connects with content.js to initiate scanning in the current tab.
Controls the progress animation and displays scan results in the popup.
javascript
Copy code
document.getElementById("start-button").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { message: "scan_email" });
    });
});
style.css: Styles the popup interface, including the progress bar, buttons, and dialog layout, for a clean and professional look.

🔍 How It Works
Initialization:

Phiserman initializes upon installation and provides a popup interface for users to interact with.
Scanning Process:

When the Start Scanning button is clicked, popup.js sends a command to content.js.
content.js scans the emails in Gmail or Outlook, sending each email’s data to a local server (server.py) for phishing detection.
Detection and Highlighting:

Emails identified as suspicious are flagged by adding a warning message and red border around the email in the interface.
:wrench: Backend (Server)
main.py and server.py:
These files set up a Flask server that receives email data from content.js and analyzes it to predict phishing emails.
server.py defines API routes to handle email data, while main.py runs the server.
Screenshots

Phiserman popup interface with controls


Example of a flagged suspicious email in Gmail

📜 License
This project is licensed under the MIT License. See the LICENSE file for details.

ℹ️ About
Phiserman is developed to provide an extra layer of security for users handling sensitive emails. It uses simple heuristics and integrates with a backend server to analyze email data, making it easier to detect phishing attempts before they cause harm.

For more details or contributions, feel free to reach out or open an issue in the repository.