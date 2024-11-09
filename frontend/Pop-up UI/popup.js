// Add click event listener to the button in the popup
document.getElementById("check-email").addEventListener("click", () => {
  // Query the active tab in the current window
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    // Send a message to the content script to initiate the scan
    chrome.tabs.sendMessage(tabs[0].id, { message: "scan_email" }, (response) => {
      if (response && response.emailText) {
        // Display the result in the popup
        document.getElementById("result").textContent = "Scan completed. Suspicious emails detected!";
      } else {
        document.getElementById("result").textContent = "No suspicious emails detected.";
      }
    });
  });
});