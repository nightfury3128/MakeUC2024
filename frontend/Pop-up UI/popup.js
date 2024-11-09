// Add click event listener to the button in the popup
document.getElementById("check-email").addEventListener("click", () => {
  // Query the active tab in the current window
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    // Execute the checkEmail function in the active tab
    chrome.scripting.executeScript(
      {
        target: { tabId: tabs[0].id },
        function: checkEmail // Defined in content.js, called here
      },
      (result) => {
        // Display the result in the popup
        document.getElementById("result").textContent = result[0]?.result || "Error in detection";
      }
    );
  });
});
