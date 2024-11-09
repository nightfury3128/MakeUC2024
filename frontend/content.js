chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === "scan_email") {
      scanEmails();
      const emailText = document.body.innerText;
      sendResponse({ emailText });
    }
  });
  
function flagEmail(emailElement) {
    // Add a warning style or icon
    emailElement.style.border = '2px solid red';
  
    const warning = document.createElement('div');
    warning.innerText = '⚠️ Suspicious Email Detected';
    warning.style.color = 'red';
    warning.style.fontWeight = 'bold';
    warning.style.marginBottom = '5px';
    emailElement.prepend(warning);
  }

function scanEmails() {
    // Select all email elements on the page
    const emailElements = document.querySelectorAll(/* Your email element selector */);
  
    emailElements.forEach(emailElement => {
      if (!scannedEmails.has(emailElement)) {
        scannedEmails.add(emailElement);
      }
      // Extract email data
      const subjectElement = emailElement.querySelector(/* Subject selector */);
      const senderElement = emailElement.querySelector(/* Sender selector */);
      const bodyElement = emailElement.querySelector(/* Body selector */);
  
      if (subjectElement && senderElement && bodyElement) {
        const emailData = {
          subject: subjectElement.innerText,
          sender: senderElement.innerText,
          body: bodyElement.innerText
        };
  
        // Send email data to backend API
        fetch('http://localhost:5000/analyze_email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(emailData)
        })
        .then(response => response.json())
        .then(result => {
          if (result.suspicious) {
            // Flag the email as suspicious
            flagEmail(emailElement);
          }
        })
        .catch(error => console.error('Error:', error));
      } else {
        console.warn('Email data could not be extracted for an email element.');
      }
    });
  }
  
  // Run the scan when the page loads
  window.addEventListener('load', scanEmails);
  
  // Observe changes in the DOM to detect new emails
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(() => {
      scanEmails();
    });
  });
  
  observer.observe(document.body, { childList: true, subtree: true });