document.getElementById("check-email").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id },
          function: checkEmail,
        },
        (result) => {
          document.getElementById("result").textContent = result[0].result;
        }
      );
    });
  });
  
  async function checkEmail() {
    const emailText = document.body.innerText; // Simple way to grab email content
    const response = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email_text: emailText }),
    });
    const data = await response.json();
    return data.is_phishing ? "Phishing Email Detected" : "Safe Email";
  }
  