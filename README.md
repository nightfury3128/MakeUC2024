Phiserman
Phiserman is a Chrome Extension designed to detect potential phishing emails in Gmail and Outlook. It scans emails, highlights suspicious content, and provides a simple user interface for easy use.

Features
Real-time Email Scanning: Detects suspicious emails on Gmail and Outlook platforms.
User Interface: Accessible popup to start and stop scanning, with a progress bar and result display.
Visual Alerts: Highlights suspicious emails with a red border and a warning icon.
Installation
Clone the repository:
bash
Copy code
git clone https://github.com/username/phiserman.git
cd phiserman
Load the extension in Chrome:
Go to chrome://extensions/
Enable Developer Mode
Click Load unpacked and select the project directory.
Usage
Open Gmail or Outlook in your browser.
Click the Phiserman extension icon to open the popup.
Click Start Scanning to detect and highlight any suspicious emails.
Files Overview
Core Components
manifest.json: Defines the extension's metadata, permissions, and specifies content scripts for Gmail and Outlook.

background.js: Sets up a background listener that activates when Phiserman is installed.

javascript
Copy code
chrome.runtime.onInstalled.addListener(() => {
    console.log("Phiserman installed!");
});
Content Script
content.js:

Scans emails on Gmail and Outlook.
Receives messages from popup.js to trigger scanning.
Highlights emails flagged as suspicious by adding a red border and warning text.
Example function for highlighting:

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

Provides a UI with buttons to start and stop scanning, a progress bar, and result display.
popup.js:

Connects with content.js to initiate email scanning.
Controls the scanning animation and displays results.
javascript
Copy code
document.getElementById("start-button").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { message: "scan_email" });
    });
});
style.css: Styles the popup with a clean, user-friendly layout, and styles for buttons and the progress bar.

How It Works
Initialization:

The extension sets up on installation and provides a popup interface.
Scanning Process:

Upon clicking "Start Scanning," popup.js signals content.js to start scanning.
content.js gathers email data and sends it to a local server (server.py) for analysis.
Detection and Highlighting:

Emails flagged as phishing are highlighted with a warning message and red border.
Backend (Server)
main.py and server.py:
These files run a Flask server that receives email data from content.js and assesses it for phishing traits.
server.py defines routes for handling the email data, while main.py initiates the server.
License
This project is licensed under the MIT License.